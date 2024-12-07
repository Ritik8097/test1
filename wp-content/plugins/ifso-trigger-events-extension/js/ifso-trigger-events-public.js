var ifso_initialized_modals = [];
(function( $ ) {
    ifso_scope.replaceLoadLaterTriggers = function (defer = false) {
        var _this = this;
        var toReplace = this.lookForLoadLaterTriggers(defer,false);
        var triggers_with_events = [];
        if (toReplace.length > 0) {
            this.sendAjaxReq('render_ifso_shortcodes', {triggers: toReplace, pageload_referrer: referrer_for_pageload}, function (ret) {	//Referrer from if-so public
                if (ret && ret !== null) {
                    try {
                        var data = JSON.parse(ret);
                        $.each(data, function (tid, tval) {
                            var tagsInDom = typeof(_this.lookForTriggerTags)==='function' ? _this.lookForTriggerTags(tid) : $('IfSoTrigger[tid="' + tid + '"]');
                            tagsInDom.each(function (i, tag) {
                                if (null !== tag.getAttribute('eventType')) {	//If the trigger has an Eventtype setup,add its data to the triggers_with_events array
                                    var dataFromShortcode = {};
                                    $.each(tag.attributes, function (i, attr) {
                                        if (attr.name !== 'style') {
                                            dataFromShortcode[attr.name] = attr.value;
                                        }
                                    })
                                    dataFromShortcode.element = tag;
                                    dataFromShortcode.content = tval;
                                    triggers_with_events.push(dataFromShortcode);
                                    return;
                                }
                               BaseTriggerCallback(tag,tval);
                            })
                        });
                        if (triggers_with_events.length > 0) {
                            ifso_scope.process_triggers_with_events(triggers_with_events);
                        }
                        DispatchTriggersLoaded();
                    } catch (e) {
                        console.error('Error fetching if-so triggers!');
                        console.error(e);
                    }
                }
            })
        }
    }

    ifso_scope.process_triggers_with_events = function (triggers_with_events) {
        var callback = function (element, content) {
            BaseTriggerCallback(element,content);
            DispatchTriggersLoaded();
        };
        var _this = this;
        $.each(triggers_with_events, function (index, trigger) {
            var eventType = trigger.eventtype;
            if (typeof (_this.loadTriggerEvents[eventType]) !== 'undefined') {
                _this.loadTriggerEvents[eventType](trigger, callback);
            }
            else{
                BaseTriggerCallback(trigger.element,trigger.content);
            }
        });
        ifso_after_trigger_events_processed();
    }


    ifso_scope.loadTriggerEvents = {
        'scroll': function (trigger, callback) {
            $(document).one('scroll', function () {
                callback(trigger.element, trigger.content);
            });
        },

        'click': function (trigger, callback) {
            if (typeof (trigger.target) !== 'undefined') {
                $(trigger.target).one('click', function () {
                    callback(trigger.element, trigger.content);
                });
            }
        },

        'inactivity': function (trigger, callback) {
            if (typeof (trigger.time) !== 'undefined') {
                var timeCounter = 0;

                var clearCounter = function () {
                    timeCounter = 0;
                };

                addEventListener('mousemove', clearCounter);
                addEventListener('keypress', clearCounter);

                var inactivityInterval = setInterval(function () {
                    timeCounter++;
                    if (timeCounter >= trigger.time) {
                        callback(trigger.element, trigger.content);
                        removeEventListener('mousemove', clearCounter);
                        removeEventListener('keypress', clearCounter);
                        clearInterval(inactivityInterval);
                    }
                }, 1000);
            }
        },

        'exit-intent': function (trigger, callback) {
            var mouseleaveCB = function (e) {
                if (e.relatedTarget === null) {
                    if (e.clientY < 0) {
                        setTimeout(function () {
                            callback(trigger.element, trigger.content);
                            document.removeEventListener('mouseout', mouseleaveCB);
                        }, 250);
                    }
                }
            };
            document.addEventListener('mouseout', mouseleaveCB);
        },

        'delay': function(trigger,callback) {
            if(trigger.delay && !isNaN(parseInt(trigger.delay))){
                var delaySec = parseInt(trigger.delay) * 1000;
                setTimeout(function(){
                    callback(trigger.element,trigger.content);
                },delaySec);
            }
            else{
                callback(trigger.element,trigger.content);
            }
        },

        'youtube' : function(trigger,callback){
            if(trigger.target && document.querySelector(trigger.target)!==null){
                var eventType = trigger.event ? trigger.event : 'play';
                var target_el = document.querySelector(trigger.target).tagName.toLowerCase()==='iframe' ? document.querySelector(trigger.target) : document.querySelector(trigger.target).querySelector('iframe');
                if(target_el!==null){
                    if(typeof(ifso_scope['youtube-trigger-events'])==='undefined') ifso_scope['youtube-trigger-events'] = {};
                    if(typeof(ifso_scope['youtube-trigger-events'][trigger.target])==='undefined') ifso_scope['youtube-trigger-events'][trigger.target] = {};
                    if(typeof(ifso_scope['youtube-trigger-events']['callbacks'])==='undefined') ifso_scope['youtube-trigger-events']['callbacks'] = [];
                    ifso_scope['youtube-trigger-events']['callbacks'].push(function(){
                        if(typeof(ifso_scope['youtube-trigger-events'][trigger.target]['player'])==='undefined'){
                            ifso_scope['youtube-trigger-events'][trigger.target]['player'] = new YT.Player(target_el);
                        }
                        ifso_scope['youtube-trigger-events'][trigger.target]['player'].addEventListener('onStateChange',function(e){
                            if(trigger.element.parentElement===null) return;
                            if(eventType==='play'){
                                if(e.data===YT.PlayerState.PLAYING)
                                    callback(trigger.element,trigger.content);
                            }
                            if(eventType==='pause'){
                                if(e.data===YT.PlayerState.PAUSED)
                                    callback(trigger.element,trigger.content);
                            }
                            if(eventType==='time-watched' || eventType==='time-reached'){
                                var time = trigger.time ? parseInt(trigger.time) : 0;

                                if(typeof(ifso_scope['youtube-trigger-events'][trigger.target][eventType])==='undefined') ifso_scope['youtube-trigger-events'][trigger.target][eventType] = {};
                                if(e.data===YT.PlayerState.PLAYING){
                                    if(eventType==='time-watched')
                                        var now = typeof(ifso_scope['youtube-trigger-events'][trigger.target][eventType]['counter'])==='undefined' ? 0 : ifso_scope['youtube-trigger-events'][trigger.target][eventType]['counter'];
                                    else
                                        var now = parseInt(e.target.getCurrentTime());
                                    ifso_scope['youtube-trigger-events'][trigger.target][eventType]['counter'] = now;
                                    ifso_scope['youtube-trigger-events'][trigger.target][eventType]['interval'] = setInterval(function (){
                                        ifso_scope['youtube-trigger-events'][trigger.target][eventType]['counter']++;
                                        if(time<=ifso_scope['youtube-trigger-events'][trigger.target][eventType]['counter']){
                                            callback(trigger.element,trigger.content);
                                            clearInterval(ifso_scope['youtube-trigger-events'][trigger.target][eventType]['interval']);
                                        }
                                    },1000);
                                }
                                else
                                    clearInterval(ifso_scope['youtube-trigger-events'][trigger.target][eventType]['interval']);
                            }
                        })
                    });
                }
            }
        },

        'custom-event':function(trigger,callback){
            if(trigger.eventname){
                if(typeof(ifso_scope['custom-event-triggerEvents'])==='undefined') ifso_scope['custom-event-triggerEvents'] = [];
                ifso_scope['custom-event-triggerEvents'].push(trigger);
                document.addEventListener(trigger.eventname,function(){callback(trigger.element,trigger.content);});
            }
        }

    };



    var ifso_modal_initialized_event = document.createEvent('Event');
    ifso_modal_initialized_event.initEvent('ifso_modal_initialized', true, true);

    var modalsCreated = 0;
    $( document ).ready(function() {
        InitModals();
        if(typeof(ifso_scope.DispatchAjaxContentLoaded)!=='undefined')
            document.addEventListener("ifso_ajax_content_loaded",InitModals);
        else
            document.addEventListener("ifso_ajax_triggers_loaded",InitModals);
    });

    function InitModals(){
        var tags = $('IfSoModalContent');
        tags.each(function(index,el){
            if(!el.classList.contains('ready')){
                var content = el.innerHTML;
                var className = (null!==el.getAttribute('classname')) ? el.getAttribute('classname').replace(' ' ,'_') : 'modal-'+modalsCreated++;
                var closebtn = (null !== el.getAttribute('closebtn')) ? el.getAttribute('closebtn') : false;
                var openbtn = (null !== el.getAttribute('openbtn')) ? element.getAttribute('openbtn') : false;
                InitAndOpenModal(content,className,closebtn,openbtn);
                el.classList.add('ready');
            }
        });
    }

    function InitAndOpenModal(content, className, closeWithButton = false,openWithButton = false){
        if(content === '' || content === null || content.replaceAll(/\<ifsoTriggerAnalyticsEvent.*\>.*<\/ifsoTriggerAnalyticsEvent\>/gi,'')==='') return false;
        var lockedModal = (!!closeWithButton);
        var allowReopen = (!!openWithButton);
        var dummyEl = document.createElement('div');
        dummyEl.innerHTML = content;
        dummyEl.className = 'ifso_modal_content';

        var mod = new TinyModal(className,lockedModal);
        mod.createModal(dummyEl);
        mod.openModal();

        if(lockedModal){
            if(mod.mainElement.querySelector(closeWithButton)!==null){
                mod.mainElement.querySelector(closeWithButton).addEventListener('click',function (){
                    if(!allowReopen) mod.removeModal();
                    else mod.closeModal();
                });
            }
        }

        if(allowReopen){
            var reopenBtn = document.querySelector(openWithButton);
            if(reopenBtn!==null){
                reopenBtn.addEventListener('click',function(){
                    mod.openModal();
                });
            }
        }

        ifso_initialized_modals.push(mod);
        document.dispatchEvent(ifso_modal_initialized_event);

        return mod;
    }

    function BaseTriggerCallback(element,content) {
        if(element.getAttribute('display') && element.getAttribute('display') === 'modal') {
            var className = (null !== element.getAttribute('classname')) ? element.getAttribute('classname').replace(' ', '_') : 'ifso_trigger_content_modal';
            var closebtn = (null !== element.getAttribute('closebtn')) ? element.getAttribute('closebtn') : false;
            var openbtn = (null !== element.getAttribute('openbtn')) ? element.getAttribute('openbtn') : false;
            InitAndOpenModal(content, className, closebtn, openbtn);
            element.outerHTML = '';
        }
        else {
            element.outerHTML = content;
        }

        if(typeof(ifso_scope.evalScriptsFromHTML) === 'function')
            ifso_scope.evalScriptsFromHTML(content);
    }

    function DispatchTriggersLoaded() {
        if(typeof(ifso_scope.DispatchTriggersLoaded) === 'function')
            ifso_scope.DispatchTriggersLoaded();
    }

    var redirectOnInteraction = function(el,rdrUrl,numberOfClicks,cname,cval,expires){
        if($(el).hasClass('activated'))
            return;
        var ifsoJerkAnimations = document.getElementById('ifsoJerkAnimations');
        if(ifsoJerkAnimations==null){
            var cssText = '@keyframes jerkup{0%{transform:translateY(0);}50%{transform:translateY(-2px);}100%{transform:translateY(0);}}' +
                '@keyframes jerkdown{0%{transform:translateY(0);}50%{transform:translateY(2px)}100%{transform:translateY(0);}}';
            var cssEl = document.createElement('style');
            cssEl.innerHTML = cssText;
            cssEl.id = 'ifsoJerkAnimations';
            var head = document.head || document.getElementsByTagName('head')[0];
            head.appendChild(cssEl);
            $(el).addClass('activated');
        }
        this.el = el;
        this.rdrUrl = rdrUrl;
        this.clicks = 0;
        this.targetClicks = numberOfClicks;
        this.cookieToSet = {'name':cname, 'value':cval, 'expires':expires};
        this.realClickHandler = this.clickHandler.bind(this);
        this.el.addEventListener('click',this.realClickHandler);
    };
    redirectOnInteraction.prototype = {
        clickHandler : function () {
            var animationToApply = (this.clicks%2===0) ? 'jerkup' : 'jerkdown';
            this.el.style.animation = animationToApply + '  0.25s 3';
            this.clicks++;
            if(this.clicks>=this.targetClicks){
                if(this.cookieToSet.name!=='')
                    this.createCookie(this.cookieToSet.name,this.cookieToSet.value,this.cookieToSet.expires);
                if(this.rdrUrl!=='')
                    location.href = this.rdrUrl;
                this.el.removeEventListener('click',this.realClickHandler);
            }
        },
        createCookie : function(name, value, mins) {
            var expires;
            if (mins) {
                var date = new Date();
                date.setTime(date.getTime()+(mins*60*1000));
                expires = "; expires="+date.toGMTString();
            }
            else {
                expires = "";
            }
            document.cookie = name+"="+value+expires+"; path=/";
        }
    }
    function initInteractionRedirects(){
        var els = $('IfsoInteractRdr');
        els.each(function (index,el) {
            var clicks = el.getAttribute('clicks');
            var url = el.getAttribute('url');
            var cname = el.getAttribute('cname');
            var cval = el.getAttribute('cval');
            var expires = el.getAttribute('expires');
            var n = new redirectOnInteraction(el,url,clicks,cname,cval,expires);
        });
    }

    function isElementInViewport (el) {
        if (typeof jQuery === "function" && el instanceof jQuery) {
            el = el[0];
        }
        var rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
            rect.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
        );
    }
    function scanCookieAdders(){
        var elements = document.querySelectorAll('.ifso-add-cookie-on-view:not([done])');
        elements = Array.prototype.slice.call(elements);
        if(elements.length<=0) return;
        for(var i=0;i<elements.length;i++){
            if(isElementInViewport(elements[i])){
                var cookiename = typeof(elements[i].getAttribute('cookiename'))==='string'? elements[i].getAttribute('cookiename') : 'ifso-viewed-element';
                var cookieval = typeof (elements[i].id)==='string' && elements[i].id!=='' ? elements[i].id : '1';
                var expiration = typeof (elements[i].getAttribute('expiration'))==='string' ? elements[i].getAttribute('expiration') : 365;
                expiration = expiration==='session' || isNaN(parseInt(expiration)) ? false : parseInt(expiration);
                ifso_scope.createCookie(cookiename,cookieval,expiration);
                elements[i].setAttribute('done','yes');
            }
        }
    }
    function enableYoutubeIframesJSApi(){
        var iframes = document.querySelectorAll('iframe.ifso-youtube, .ifso-youtube iframe');
        iframes = Array.prototype.slice.call(iframes);
        if(iframes.length<=0) return;
        for(var i=0;i<iframes.length;i++){
            if(iframes[i].getAttribute('ifso-ready')===null){
                iframes[i].src = iframes[i].src+'&enablejsapi=1';
                iframes[i].setAttribute("ifso-ready",'1');
            }

        }
    }
    function ifso_after_trigger_events_processed(){
        if(typeof(ifso_scope['youtube-trigger-events'])!=='undefined'){
            if(!ifso_scope['yt_iframe_api_loaded']){
                ifso_scope['yt_iframe_api_loaded'] = true;
                var imported_script = document.createElement('script');
                imported_script.id = 'iframe-api-tag';
                imported_script.src = 'https://www.youtube.com/iframe_api';
                var firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(imported_script, firstScriptTag);
            }
            window.onYouTubeIframeAPIReady = () => {
                var cbks =  ifso_scope['youtube-trigger-events']['callbacks'];
                for(var i=0;i<=cbks.length-1;i++){
                    if(typeof(ifso_scope['youtube-trigger-events']['callbacks'][i])==='function')
                        ifso_scope['youtube-trigger-events']['callbacks'][i]();
                }
            };
        }
    }
    function init_extra_features(){
        enableYoutubeIframesJSApi();
        initInteractionRedirects();
        scanCookieAdders();
    }
    $( document ).ready(function() {
        init_extra_features();
        if(typeof(ifso_scope.DispatchAjaxContentLoaded)!=='undefined')
            document.addEventListener("ifso_ajax_content_loaded",init_extra_features);
        else
            document.addEventListener("ifso_ajax_triggers_loaded",init_extra_features);
        document.addEventListener('scroll',scanCookieAdders);
    });
})( jQuery );