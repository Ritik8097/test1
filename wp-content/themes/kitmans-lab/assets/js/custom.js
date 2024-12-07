jQuery(document).ready(function () {
  // INITIALIZE SLIDERS
  var swiperRetries = 0;
  const checkSwiperInterval = setInterval(() => {
    if (typeof Swiper !== "undefined") {
      clearInterval(checkSwiperInterval);

      timelineSlider();
      seenHeardSlider();
      outcomeStorySlider();
      teamMemberSlider();

      console.log("Swiper is now initialized.");
    } else {
      swiperRetries++;
      if (swiperRetries > 30) {
        clearInterval(checkSwiperInterval);
        return;
      }

      console.log("Swiper is not loaded yet. Retrying...");
    }
  }, 1000);

  // SHOW SEARCH BOX AND LANGUAGE SELECT ON CLICK
  var searchSection = jQuery(".search-section");
  var languageSection = jQuery(".language-section");

  jQuery(".menu-search-icon").on("click", function () {
    searchSection.toggleClass("active");
    languageSection.removeClass("active");
  });

  jQuery(".menu-lang-icon").on("click", function () {
    languageSection.toggleClass("active");
    searchSection.removeClass("active");
  });

  // Home - Testimonial
  jQuery(".testi-auth").on("click", function () {
    var elemID = jQuery(".testi-auth").index(this);
    jQuery(".home-testi")
      .not(":eq(" + elemID + ")")
      .fadeOut();
    jQuery(".home-testi")
      .filter(":eq(" + elemID + ")")
      .fadeIn();

    jQuery(".testi-auth")
      .not(":eq(" + elemID + ")")
      .removeClass("testi-active");
    jQuery(".testi-auth")
      .filter(":eq(" + elemID + ")")
      .addClass("testi-active");
  });

  // See All Team Members Button
  jQuery(".see-all-team a").on("click", function () {
    jQuery(".team-slider").hide();
    jQuery(this).hide();
    jQuery(".team-strategists.team-grid ").fadeIn();
  });

  // Scroll Indicator
  var timer;
  jQuery(document).scroll(function () {
    if (timer != "undefined") {
      clearTimeout(timer);
    }

    jQuery(".hide-scroll").fadeOut();
    timer = setTimeout(function () {
      jQuery(".hide-scroll").fadeIn();
    }, 2150);
  });

  if (jQuery("#author_sb_box").length) {
    var elem = $("#author_sb_box").find(".pp-author-boxes-name a");

    elem.removeAttr("href");
    elem.off("click");
    $(elem).on("click", function (e) {
      e.preventDefault();
    });
  }

  /* Resource Filter Page */
  if (jQuery("#resource-filter-dropdown").length) {
    var url = new URL(window.location);
    var params = new URLSearchParams(url.search);
    var select_dd = jQuery("select");
    var page_num = 1;
    var rfp_items = 0;

    var dd_con_type = "";
    var dd_sol = "";
    var dd_sport = "";
    var dd_lang = "";

    if (params.has("filter")) {
      dd_con_type = params.get("filter");
      jQuery('select option[value="' + dd_con_type + '"]').attr(
        "selected",
        "selected"
      );
    }
    if (params.has("solution")) {
      dd_sol = params.get("solution");
      jQuery('select option[value="' + dd_sol + '"]').attr(
        "selected",
        "selected"
      );
    }
    if (params.has("sport")) {
      dd_sport = params.get("sport");
      jQuery('select option[value="' + dd_sport + '"]').attr(
        "selected",
        "selected"
      );
    }
    if (params.has("lang")) {
      dd_lang = params.get("lang");
      jQuery('select option[value="' + dd_lang + '"]').attr(
        "selected",
        "selected"
      );
    } else {
      jQuery("select option[value=english]").attr("selected", "selected");
    }
    if (params.has("pg")) {
      page_num = params.get("pg");
    }

    function load_resources_items() {
      console.log("filter: " + dd_con_type);
      console.log("solution: " + dd_sol);
      console.log("sport: " + dd_sport);
      console.log("lang: " + dd_lang);
      console.log("pg: " + page_num);

      jQuery("#resource_ajax_data").html('<span class="loader"></span>');
      wp.ajax
        .post("rp_filter", {
          filter: dd_con_type,
          solution: dd_sol,
          sport: dd_sport,
          lang: dd_lang,
          pg: page_num,
        })
        .done(function (response) {
          console.log(response.query);

          jQuery("#resource_ajax_data").html(response.data);
          rfp_items = jQuery(".rfp-items").length;

          window.history.pushState({}, "", url);
        });
    }
    load_resources_items();

    select_dd.on("change", function () {
      dd_con_type = jQuery("#form-field-content_type_rpfdd").val();
      dd_sol = jQuery("#form-field-solution_rpfdd").val();
      dd_sport = jQuery("#form-field-sport_rpfdd").val();
      dd_lang = jQuery("#form-field-language_rpfdd").val();

      url.searchParams.delete("pg");
      if (dd_con_type != "") {
        url.searchParams.set("filter", dd_con_type);
      }
      if (dd_sol != "") {
        url.searchParams.set("solution", dd_sol);
      }
      if (dd_sport != "") {
        url.searchParams.set("sport", dd_sport);
      }
      if (dd_lang != "") {
        url.searchParams.set("lang", dd_lang);
      }
      load_resources_items();
    });

    // pagination btn, on click ajax
    jQuery(document).on("click", ".page-numbers", function (event) {
      event.preventDefault();
      jQuery("html, body").animate({ scrollTop: 0 }, 500);
      var pageHref = jQuery(this).attr("href");
      page_num = pageHref.split("?").pop();
      page_num = page_num.split("=").pop();
      if (page_num != 1) {
        url.searchParams.set("pg", page_num);
      }
      load_resources_items();
    });

    // check if there are lessa than 3 results, adjust the css
    if (rfp_items < 3) {
      jQuery(".rfp-item-wrap").css("justify-content", "flex-start");
      jQuery(".rfp-items").css("margin-right", "20px");
    }

    /*
        var url = new URL(window.location);
        var params = new URLSearchParams(url.search);
        var select_dd = jQuery('select');
        var page_num = 1;
        var rfp_items = 0;
        var filter_val = '';

        if (params.has('filter')) { //select dropdown if has filter param
            filter_val = params.get('filter');
            jQuery('select option[value="' + filter_val + '"]').attr('selected', 'selected');
        } else {
            jQuery('select option[value=english]').attr('selected', 'selected');
        }
        if (params.has('pg')) {
            page_num = params.get('pg');
        }

        function load_resources_items() {

            jQuery('#resource_ajax_data').html('<span class="loader"></span>');
            wp.ajax.post("rp_filter", { filter: filter_val, pg: page_num }).done(function(response) {

                jQuery('#resource_ajax_data').html(response);
                rfp_items = jQuery('.rfp-items').length;

                window.history.pushState({}, '', url);
            });
        }
        load_resources_items();

        // on select of option in the filter, load items based on selected filter
        var searchParams = new URLSearchParams(url.search);
        select_dd.on('change', function() {

            var selID = jQuery(this).attr('id');
            filter_val = jQuery(this).val();

            // resets other dropdown select
            jQuery(select_dd).each(function() {
                if (selID != jQuery(this).attr('id')) {
                    jQuery(this).prop('selectedIndex', 0);
                }
            });
            url.searchParams.delete('pg');
            if (filter_val != '') {
                url.searchParams.set('filter', filter_val);
            }
            load_resources_items();
        });

        // pagination btn, on click ajax
        jQuery(document).on('click', '.page-numbers', function(event) {

            event.preventDefault();
            jQuery('html, body').animate({ scrollTop: 0 }, 500);

            var pageHref = jQuery(this).attr('href');
            page_num = pageHref.split("?").pop();
            page_num = page_num.split("=").pop();
            if (page_num != 1) {
                url.searchParams.set('pg', page_num);
            }
            load_resources_items();
        });

        // check if there are lessa than 3 results, adjust the css
        if (rfp_items < 3) {
            jQuery('.rfp-item-wrap').css('justify-content', 'flex-start');
            jQuery('.rfp-items').css('margin-right', '20px');
        }
        */
  }

  /* GEOLOCATION POPUP */
  jQuery("body").on("click", ".tiny-modal-overlay", function () {
    var lang = Cookies.get("wp-wpml_current_language"); //jQuery.cookie("wp-wpml_current_language");
    setLangPreference(lang);
  });

  /* GEOLOCATION REDIRECT POPUP */
  var popupId = 37266;
  var currentLang = Cookies.get("wp-wpml_current_language"); //jQuery.cookie("wp-wpml_current_language");
  var preferredLang = Cookies.get("lang_preference"); //jQuery.cookie("lang_preference");
  var isPopupClosed = false;
  var isRedirecting = false;
  var isTranslated = jQuery("#is-page-translated").html();

  if (
    preferredLang &&
    preferredLang != "undefined" &&
    currentLang != preferredLang &&
    isTranslated == "true"
  ) {
    jQuery(window).on("elementor/frontend/init", function () {
      elementorFrontend.on("components:init", function () {
        setTimeout(() => {
          elementorFrontend.documentsManager.documents[popupId].showModal();
        }, 1000);
      });

      setTimeout(function () {
        if (!isPopupClosed) {
          var redirectLink = jQuery("#language-site").data("url");
          isRedirecting = true;
          window.location.replace(redirectLink);
        }
      }, 3500);
    });

    jQuery(document).on("elementor/popup/hide", (event, id, instance) => {
      if (id === popupId) {
        var lang = Cookies.get("wp-wpml_current_language"); //jQuery.cookie("wp-wpml_current_language");
        setLangPreference(lang);
        isPopupClosed = true;

        // console.log("v9");
        // setTimeout(function() {
        //     var welcomeMatId = jQuery(".language-redirect-popup + .welcome-mat-popup").attr('id');
        //     if (welcomeMatId) {
        //         var popupPostId = welcomeMatId.replace("elementor-popup-modal-", "");
        //         var elementorLocalStorage = JSON.parse(localStorage.getItem('elementor'));
        //         var impressionCount = elementorLocalStorage["popup-" + popupPostId + "-impressions-count"];
        //         console.log(impressionCount);

        //         elementorLocalStorage["popup-" + popupPostId + "-impressions-count"] = 0;
        //         localStorage.setItem('elementor', JSON.stringify(elementorLocalStorage));
        //     }  else {
        //         console.log("nopop");
        //     }
        // }, 3000);

        if (isRedirecting) {
          window.stop();
        }
      }
    });
  }

  // RESOURCE REDIRECT POPUP
  var resourceRedirectLink = "/";
  jQuery("a.resource-popup-btn, .resource-popup-btn a").on(
    "click",
    function (e) {
      e.preventDefault();
      resourceRedirectLink = jQuery(this).attr("href");
    }
  );

  jQuery("body").on("click", ".resource-popup-continue", function () {
    setLangPreference("en");
    window.location.replace(resourceRedirectLink);
  });

  // HIGHLIGHT BANNER
  jQuery(".hb-close-btn, .highlight-banner a").on("click", function () {
    jQuery(".highlight-banner").hide();
    document.cookie = "hb_closed=1;path=/";
  });

  // WELCOME BANNER
  jQuery(document).on(
    "click",
    ".welcome-mat-popup a.elementor-button",
    function (event) {
      elementorProFrontend.modules.popup.closePopup({}, event);
    }
  );
});

function setLangPreference(lang) {
  document.cookie =
    "lang_preference=" +
    lang +
    "; path=/; expires=Fri, 31 Dec 9999 21:10:10 GMT;";
}

// SLIDERS
function timelineSlider() {
  if (jQuery("#timeline").length) {
    //Timeline - reinitialize swiper
    var timeline = document.querySelector("#timeline .swiper-container");
    var params = timeline.swiper.params;
    params.freeMode = true;
    params.breakpoints = { 1024: { slidesPerView: 2 } };
    timeline.swiper.destroy();

    new Swiper(".swiper-container", params);

    // Timeline - Autoscroll on hover
    var swiper = document.querySelector("#timeline .swiper-container").swiper;
    var progress = swiper.progress;
    var intervalId;
    jQuery(".view-story .elementor-icon-box-wrapper").hover(
      function () {
        var intervalDelay = 100;
        progress = swiper.progress;
        intervalId = setInterval(function () {
          swiper.setProgress((progress += 0.01), 110);
        }, intervalDelay);
      },
      function () {
        clearInterval(intervalId);
      }
    );

    jQuery(".twae-h-line").css({ width: "65%", right: "0", left: "unset" });
    swiper.on("slideChange", function () {
      //console.log(swiper.progress);
      if (swiper.isEnd || swiper.progress > 0.91) {
        jQuery(".view-story svg").css("rotate", "90deg");
        jQuery("body").on(
          "click",
          ".view-story .elementor-icon-box-wrapper",
          clickScroll
        );
        jQuery(".twae-h-line").css({ width: "70%", right: "unset", left: "0" });
      } else if (swiper.isBeginning) {
        jQuery(".twae-h-line").css({ width: "65%", right: "0", left: "unset" });
      } else {
        jQuery(".twae-h-line").css({
          width: "100%",
          right: "0",
          left: "unset",
        });
        jQuery(".view-story svg").css("rotate", "0deg");
        jQuery("body").off(
          "click",
          ".view-story .elementor-icon-box-wrapper",
          clickScroll
        );
      }
    });

    var clickScroll = function () {
      jQuery([document.documentElement, document.body]).animate(
        {
          scrollTop: jQuery(".elementor-element-5ccd5dd").offset().top - 200,
        },
        500
      );
    };

    /*swiper.on('slideChangeTransitionEnd', function () {

            console.log(swiper.progress);

            if (swiper.isEnd || swiper.progress > 0.88) {
                jQuery('.view-story svg').css('rotate', '90deg');
            } else {
                jQuery('.view-story svg').css('rotate', '0deg');
            }
        });*/
  }
}

function teamMemberSlider() {
  if (jQuery(".team-slider").length) {
    var teamSlider = document.querySelector(".team-slider .swiper");
    teamSlider.swiper.destroy();

    new Swiper(".team-slider .swiper", {
      slidesPerView: 1,
      grid: {
        rows: 1,
      },
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        768: {
          slidesPerView: 3,
          grid: {
            rows: 2,
          },
        },
      },
    });
  }
}

function seenHeardSlider() {
  if (jQuery("#seenheard").length) {
    new Swiper("#seenheard", {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 175,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}

function outcomeStorySlider() {
  // Outcome Story Carousel
  if (jQuery("#outcomestory").length) {
    new Swiper("#outcomestory", {
      slidesPerView: 1,
      speed: 400,
      spaceBetween: 175,
      loop: true,
      pagination: {
        el: ".swiper-pagination",
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  }
}
