
function get_url_parameter_by_name( name ) {
	name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
	var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
		results = regex.exec(location.search);
	return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function populate_form_fields_value( gclid_id, msclkid_id, fbclid_id, referrer_id, entry_url_id, source_id, medium_id, term_id, content_id, campaign_id, 
                                                     ga_client_id_id, ga_1st_visit_id,
                                                     var1_id, var2_id, var3_id, var4_id, var5_id, var6_id, user_journey_tracking_id,
									                 gclid, msclkid, fbclid, referrer, entry_url, source, medium, term, content, campaign, ga_client_id, ga_1st_visit, 
                                                     var1, var2, var3, var4, var5, var6, user_journey_tracking, site_url, time_zone_diff ){
	if( gclid_id ){
		if ( gclid_id.indexOf( '###' ) != -1 ) {
			//for forminator
			var form_id_field_id_array = gclid_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( gclid );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( gclid );
				}
			}
		} else {
			if( jQuery("#" + gclid_id ).length > 0 ){
				jQuery('input[id="' + gclid_id + '"]').each(function(){
					jQuery(this).val( gclid );
				});
			}
		}
	}
    if( msclkid_id ){
		if ( msclkid_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = msclkid_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( msclkid );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( msclkid );
				}
			}
		} else {
			if( jQuery("#" + msclkid_id ).length > 0 ){
				jQuery('input[id="' + msclkid_id + '"]').each(function(){
					jQuery(this).val( msclkid );
				});
			}
		}
	}
    if( fbclid_id ){
		if ( fbclid_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = fbclid_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( fbclid );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( fbclid );
				}
			}
		} else {
			if( jQuery("#" + fbclid_id ).length > 0 ){
				jQuery('input[id="' + fbclid_id + '"]').each(function(){
					jQuery(this).val( fbclid );
				});
			}
		}
	}
	if( referrer_id ){
		if ( referrer_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = referrer_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( referrer );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( referrer );
				}
			}
		} else {
			if( jQuery("#" + referrer_id ).length > 0 ){
				jQuery('input[id="' + referrer_id + '"]').each(function(){
					jQuery(this).val( referrer );
				});
			}
		}
	}

	if( entry_url_id ){
		if ( entry_url_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = entry_url_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( entry_url );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( entry_url );
				}
			}
		} else {
			if( jQuery("#" + entry_url_id ).length > 0 ){
				jQuery('input[id="' + entry_url_id + '"]').each(function(){
					jQuery(this).val( entry_url );
				});
			}
		}
	}

	if( source_id ){
		if ( source_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = source_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( source );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( source );
				}
			}
		} else {
			if( jQuery("#" + source_id ).length > 0 ){
				jQuery('input[id="' + source_id + '"]').each(function(){
					jQuery(this).val( source );
				});
			}
		}
	}
	if( medium_id ){
		if ( medium_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = medium_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( medium );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( medium );
				}
			}
		} else {
			if( jQuery("#" + medium_id ).length > 0 ){
				jQuery('input[id="' + medium_id + '"]').each(function(){
					jQuery(this).val( medium );
				});
			}
		}
	}
	if( term_id ){
		if ( term_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = term_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( term );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( term );
				}
			}
		} else {
			if( jQuery("#" + term_id ).length > 0 ){
				jQuery('input[id="' + term_id + '"]').each(function(){
					jQuery(this).val( term );
				});
			}
		}
	}
	if( content_id ){
		if ( content_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = content_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( content );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( content );
				}
			}
		} else {
			if( jQuery("#" + content_id ).length > 0 ){
				jQuery('input[id="' + content_id + '"]').each(function(){
					jQuery(this).val( content );
				});
			}
		}
	}
	if( campaign_id ){
		if ( campaign_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = campaign_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( campaign );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( campaign );
				}
			}
		} else {
			if( jQuery("#" + campaign_id ).length > 0 ){
				jQuery('input[id="' + campaign_id + '"]').each(function(){
					jQuery(this).val( campaign );
				});
			}
		}
	}
    if( ga_client_id_id ){
		if ( ga_client_id_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = ga_client_id_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( ga_client_id );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( ga_client_id );
				}
			}
		} else {
			if( jQuery("#" + ga_client_id_id ).length > 0 ){
				jQuery('input[id="' + ga_client_id_id + '"]').each(function(){
					jQuery(this).val( ga_client_id );
				});
			}
		}
	}
    if( ga_1st_visit_id ){
		if ( ga_1st_visit_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = ga_1st_visit_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( ga_1st_visit );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( ga_1st_visit );
				}
			}
		} else {
			if( jQuery("#" + ga_1st_visit_id ).length > 0 ){
				jQuery('input[id="' + ga_1st_visit_id + '"]').each(function(){
					jQuery(this).val( ga_1st_visit );
				});
			}
		}
	}
	if( var1_id ){
		if ( var1_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = var1_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( var1 );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( var1 );
				}
			}
		} else {
			if( jQuery("#" + var1_id ).length > 0 ){
				jQuery('input[id="' + var1_id + '"]').each(function(){
					jQuery(this).val( var1 );
				});
			}
		}
	}
	if( var2_id ){
		if ( var2_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = var2_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( var2 );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( var2 );
				}
			}
		} else {
			if( jQuery("#" + var2_id ).length > 0 ){
				jQuery('input[id="' + var2_id + '"]').each(function(){
					jQuery(this).val( var2 );
				});
			}
		}
	}
	if( var3_id ){
		if ( var3_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = var3_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( var3 );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( var3 );
				}
			}
		} else {
			if( jQuery("#" + var3_id ).length > 0 ){
				jQuery('input[id="' + var3_id + '"]').each(function(){
					jQuery(this).val( var3 );
				});
			}
		}
	}
	if( var4_id ){
		if ( var4_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = var4_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( var4 );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( var4 );
				}
			}
		} else {
			if( jQuery("#" + var4_id ).length > 0 ){
				jQuery('input[id="' + var4_id + '"]').each(function(){
					jQuery(this).val( var4 );
				});
			}
		}
	}
	if( var5_id ){
		if ( var5_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = var5_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( var5 );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( var5 );
				}
			}
		} else {
			if( jQuery("#" + var5_id ).length > 0 ){
				jQuery('input[id="' + var5_id + '"]').each(function(){
					jQuery(this).val( var5 );
				});
			}
		}
	}
	if( var6_id ){
		if ( var6_id.indexOf( '###' ) != -1 ) {
			var form_id_field_id_array = var6_id.split( '###' );
			var form_id = form_id_field_id_array[0];
			var field_id = form_id_field_id_array[1];

			if ( jQuery("#" + form_id ).length > 0 ) {
				if ( jQuery("#" + form_id ).data( "uid" ) == undefined ) {
					jQuery("#" + form_id ).find( '#' + field_id ).val( var6 );
				} else {
					var uid = jQuery("#" + form_id ).data( "uid" );
					jQuery("#" + form_id ).find( '#' + field_id + '_' + uid ).val( var6 );
				}
			}
		} else {
			if( jQuery("#" + var6_id ).length > 0 ){
				jQuery('input[id="' + var6_id + '"]').each(function(){
					jQuery(this).val( var6 );
				});
			}
		}
	}
    if( user_journey_tracking_id ){
		if ( user_journey_tracking_id.indexOf( '###' ) != -1 ) {
			//doesn't support user journey data for Forminator now
		} else {
			if( jQuery("#" + user_journey_tracking_id ).length > 0 ){
				
				//convert JSON to plain text
				var user_journey_tracking_plain = convert_cookie_JSON_to_plain_text( user_journey_tracking, site_url, time_zone_diff );
				jQuery('input[id="' + user_journey_tracking_id + '"]').each(function(){
					jQuery(this).val( user_journey_tracking_plain );
				});
			}
		}
	}
    
}

function convert_cookie_JSON_to_plain_text( cookie_JSON, cookie_site_url, time_zone_diff ){
    var cookie_data_OBJ = JSON.parse( cookie_JSON );
    
    if( typeof cookie_data_OBJ.uid == "undefined" || typeof cookie_data_OBJ.expires == "undefined" || typeof cookie_data_OBJ.posts_id == "undefined" ){
        return '';
    }
    
    var now = new Date;
    var utc_timestamp = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(), now.getUTCMilliseconds());
    utc_timestamp = Math.floor( utc_timestamp / 1000 );
    
    var post_data_Array = cookie_data_OBJ.posts_id;
    if( post_data_Array.length == "undefined" ){
        return '';
    }
    
    var $user_journey_cookie_data_str = '';
    for( var index = 0; index < post_data_Array.length; index++ ){
        var post_data = post_data_Array[index];
        var title = post_data.title;
        var url = cookie_site_url + post_data.slug;
        var start_timestamp = post_data.timestamp;
        var end_timestamp = utc_timestamp;
        if( index + 1 < post_data_Array.length ){
            end_timestamp = post_data_Array[index + 1].timestamp
        }
        var stay_time_str = get_stay_time_by_timestamp( start_timestamp, end_timestamp );
        if( index + 1 == post_data_Array.length ){
            stay_time_str = 'Form Submitted';
        }
        
        $user_journey_cookie_data_str += convert_utc_timestamp_to_WP_date( post_data.timestamp, time_zone_diff );
        $user_journey_cookie_data_str += ' | ' + title;
        $user_journey_cookie_data_str += ' | ' + url;
        $user_journey_cookie_data_str += ' | ' + stay_time_str;
        $user_journey_cookie_data_str += '\n';
    }
    
    return $user_journey_cookie_data_str;
}

function get_stay_time_by_timestamp( $start, $end ){
    if( $end < $start ){
        return '0 second';
    }
    $stay_day = ( $end - $start ) / 3600 / 24;
    $stay_hr = ( $end - $start - Math.floor( $stay_day ) * 3600 * 24 ) / 3600;
    $stay_min = ( $end - $start - Math.floor( $stay_day ) * 3600 * 24 - Math.floor( $stay_hr ) * 3600 ) / 60;
    $stay_sec = $end - $start - Math.floor( $stay_day ) * 3600 * 24 - Math.floor( $stay_hr ) * 3600 - Math.floor( $stay_min ) * 60;

    $stay_str = '';
    if( $stay_day >= 1 ){
        $unit = $stay_day > 1 ? 'days' : 'day';
        $stay_str += Math.floor( $stay_day ) + ' ' + $unit + ' ';
    }
    if( $stay_hr >= 1 ){
        $unit = $stay_hr > 1 ? 'hours' : 'hour';
        $stay_str += Math.floor( $stay_hr ) + ' ' + $unit + ' ';
    }
    if( $stay_min >= 1 ){
        $unit = $stay_min > 1 ? 'minutes' : 'minute';
        $stay_str += Math.floor( $stay_min ) + ' ' + $unit + ' ';
    }

    $unit = $stay_sec > 1 ? 'seconds' : 'second';
    if( $stay_sec - Math.floor( $stay_sec ) == 0 ){
        $stay_str += Math.floor( $stay_sec ) + ' ' + $unit + ' ';
    }else{
        $stay_str += $stay_sec.toFixed(2) + ' ' + $unit + ' ';
    }

    if( $end == $start ){
        $stay_str = '0 second';
    }

    return $stay_str;
}

function convert_utc_timestamp_to_WP_date( utc_timestamp, time_zone_diff ){
    //Y F d H:i:s
    var date = new Date( ( utc_timestamp + time_zone_diff ) * 1000 );
    var year = date.getUTCFullYear();
    var month = date.getUTCMonth();
    var day = date.getUTCDate();
    var hours = "0" + date.getUTCHours();
    var minutes = "0" + date.getUTCMinutes();
    var seconds = "0" + date.getUTCSeconds();

    switch ( parseInt(month) ){
        case 0:
            month = 'January';
        break;
        case 1:
            month = 'February';
        break;
        case 2:
            month = 'March';
        break;
        case 3:
            month = 'April';
        break;
        case 4:
            month = 'May';
        break;
        case 5:
            month = 'June';
        break;
        case 6:
            month = 'July';
        break;
        case 7:
            month = 'August';
        break;
        case 8:
            month = 'September';
        break;
        case 9:
            month = 'October';
        break;
        case 10:
            month = 'November';
        break;
        case 11:
            month = 'December';
        break;
    }
    
    var date_time_str = year + ' ' + month + ' ' + day + ' ' + hours.substr(-2) + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    return date_time_str;
}
