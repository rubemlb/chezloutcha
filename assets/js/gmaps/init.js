(function ($) {
    "use strict";

    var $maphelp = $('.ct-googleMap--accordion .ct-googleMap');
    $(".ct-googleMap--accordion .ct-js-mapToogle").on('click', function () {
        var $this = $(this);
        var $map = $this.parent().find('.ct-googleMap-container');
        $this.html($this.html() == '<i class="icons8-map-marker"></i> Hide map' ? '<i class="icons8-map-marker"></i> Show map' : '<i class="icons8-map-marker"></i> Hide map');

        if ($map.height() != "0") {
            $map.animate({height: '0px'}, 500);
        } else {
            $map.animate({height: $maphelp.data("height") + "px"}, 500);
            setTimeout(function () {
                $('html, body').animate({
                    scrollTop: $map.offset().top - 180
                }, 2000);
            }, 500);
        }
    });
    /* ============================================= */
    /* ==== GOOGLE MAP ==== */

    function initmap() {

        if (($(".ct-googleMap").length > 0) && (typeof google === 'object' && typeof google.maps === 'object')) {
            $('.ct-googleMap').each(function () {
                var atcenter = "",
                    $this = $(this),
                    location = $this.data("location"),
                    zoom = $this.data("zoom"),
                    $drag = true,
                    $marker = $this.data("marker"),
                    $img = $this.attr('data-mapImage');

                if(device.mobile() || device.tablet() || ($devicewidth < 768)){
                    $drag = false;
                }
                else {
                    $drag = true;
                }
                var offset = -30;

                if (validatedata($this.data("offset"))) {
                    offset = $this.data("offset");
                }
                if (validatedata(location)) {
                    $this.gmap3({
                        marker: {
                            //latLng: [40.616439, -74.035540],
                            address: location, options: {
                                visible: $marker
                            }, callback: function (marker) {
                                atcenter = marker.getPosition();
                            }
                        }, map: {
                            options: {
                                //maxZoom:11,
                                zoom: zoom,
                                mapTypeId: google.maps.MapTypeId.ROADMAP, // ('ROADMAP', 'SATELLITE', 'HYBRID','TERRAIN');
                                scrollwheel: false,
                                disableDoubleClickZoom: false,
                                draggable: $drag, //disableDefaultUI: true,
                                mapTypeControlOptions: {
                                    //mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.HYBRID],
                                    //style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                                    //position: google.maps.ControlPosition.RIGHT_CENTER
                                    mapTypeIds: []
                                }
                            }, events: {
                                idle: function () {
                                    if (!$this.data('idle')) {
                                        $this.gmap3('get').panBy(0, offset);
                                        $this.data('idle', true);
                                    }
                                }
                            }
                        }, overlay: {
                            address: location, options: {
                                content:
                                "<div class='ct-mapBox'>" +
                                "<div class='ct-mapBox-header'>" +
                                "<span class='ct-mapBox-image'>" +
                                "<img src='"+$img+"'>" +
                                "</span>" +
                                "<span class='ct-mapBox-title'>Our location" +
                                "</span>" +
                                 "</div>" +
                                "<address>" +
                                "<strong>" +
                                "<i class='fa fa-map-marker'>" + "</i>" +
                                "<span>NY, Manhattan" +
                                "</span>" +
                                "</strong>" +
                                "<strong>" +
                                "<i class='fa fa-envelope'>" + "</i>" +
                                "<span>info@youthhostel.com" +
                                "</span>" +
                                "</strong>" +
                                "<strong>" +
                                "<i class='fa fa-phone'>" + "</i>" +
                                "<span>(+30) 1234 24 55 08" +
                                "</span>" +
                                "</strong>" +
                                "<strong>" +
                                "<i class='fa fa-clock-o'>" + "</i>" +
                                "<span>11:00 ap - 7:00 pm" +
                                "</span>" +
                                "</strong>" +
                                "</address>" +
                                 "<span class='ct-mapBox-triangle'>" + "</span>" +
                                "</div>"
                                ,offset: {
                                    y: -200, x: -150
                                }
                            }
                        }
                        //},"autofit"
                    });

                    // center on resize
                    google.maps.event.addDomListener(window, "resize", function () {
                        //var userLocation = new google.maps.LatLng(53.8018,-1.553);
                        setTimeout(function () {
                            $this.gmap3('get').setCenter(atcenter);
                            $this.gmap3('get').panBy(0, offset);
                        }, 400);

                    });

                    // set height
                    $this.css("min-height", $this.data("height") + "px");
                }

                if ($this.parent().parent().hasClass('hidemap')) {
                    $this.parent().animate({height: '0px'}, 500);
                }

            })
        }

    }

    initmap();
})(jQuery);