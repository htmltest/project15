var speedSlider         = 300;  // скорость работы слайдера
var sliderPeriod        = 5000; // время автоматической прокрутки слайдера (0 - автоматической прокрутки нет)
var sliderTimer         = null;

var messageTimer        = null;

var speedAutoSlider     = 300;  // скорость работы слайдера фото авто
var sliderAutoPeriod    = 5000; // время автоматической прокрутки слайдера фото авто (0 - автоматической прокрутки нет)
var sliderAutoTimer     = new Array();

var catalogueShow       = 2000; // время до отображения меню каталога
var catalogueHide       = 2000; // время до скрытия меню каталога
var catalogueTimer      = null;

(function($) {

    $(document).ready(function() {

        // главное меню
        $('nav').each(function() {
            $(this).data('disableAnimation', false);
        });

        $('.logo').click(function() {
            $('nav li:first a').trigger('click');
            return false;
        });

        $('nav a').click(function() {
            var curLi = $(this).parent();
            if (!curLi.hasClass('active')) {
                if (!$('nav').data('disableAnimation')) {
                    var oldSection = $('nav li').index($('nav li.active'));
                    $('nav').data('disableAnimation', true);
                    var curSection = $('nav li').index(curLi);
                    $('nav li.active').removeClass('active');
                    curLi.addClass('active');
                    $('.section-item').eq(oldSection).slideUp();
                    $('.section-item').eq(curSection).slideDown(function() {
                        if ($(window).height() - 260 > $('.section-item').eq(curSection).height()) {
                            $('.section-item').eq(curSection).height($(window).height() - 260);
                        }
                        $('nav').data('disableAnimation', false);
                    });
                    if (curSection == 1) {
                        $('.catalogue-menu-active').css({'left': $('.catalogue-menu-inner li.active .catalogue-menu-item').offset().left - $('.catalogue-menu-inner').offset().left});
                        window.clearTimeout(catalogueTimer);
                        catalogueTimer = null;
                        catalogueTimer = window.setTimeout(function() { $('.catalogue-menu').slideDown(); }, catalogueShow);
                    }
                    history.pushState(null, null, this.href);
                };
            }
            return false;
        });

        $(window).bind('popstate', function(e) {
            var returnLocation = history.location || document.location;
        });

        // слайдер на главной странице
        $('.slider-content ul li a').hover(
            function() {
                $(this).parent().find('div').addClass('hover');
            },

            function() {
                $(this).parent().find('div').removeClass('hover');
            }
        );

        $('.slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', false);
            if (sliderPeriod > 0 && $('.slider-item').length > 0) {
                sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
            }
        });

        $('.slider-next').click(function() {
            var curSlider = $('.slider');
            if (!curSlider.data('disableAnimation')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;
                curSlider.data('disableAnimation', true);

                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex + 1;
                if (newIndex > $('.slider-item').length - 1) {
                    newIndex = 0;
                    sliderPeriod = 0;
                }

                $('.slider-item').eq(curIndex).find('.slider-title, .slider-descr').fadeOut(speedSlider, function() {
                    $('.slider-item').eq(curIndex).find('li').each(function() {
                        var curLi = $(this);
                        var curLiIndex = $('.slider-item').eq(curIndex).find('li').index(curLi);
                        window.setTimeout(function() { curLi.animate({'margin-left': -3000}); }, ($('.slider-item').eq(curIndex).find('li').length - curLiIndex - 1) * speedSlider);
                    });
                    window.setTimeout(function() {
                        $('.slider-item').eq(curIndex).css({'left': -3000});
                        $('.slider-item').eq(newIndex).find('li').css({'margin-left': 3000});
                        $('.slider-item').eq(newIndex).find('.slider-title, .slider-descr').hide();
                        $('.slider-item').eq(newIndex).css({'left': 0});
                        $('.slider-item').eq(newIndex).find('li').each(function() {
                            var curLi = $(this);
                            var curLiIndex = $('.slider-item').eq(newIndex).find('li').index(curLi);
                            window.setTimeout(function() { curLi.animate({'margin-left': 0}); }, ($('.slider-item').eq(newIndex).find('li').length - curLiIndex - 1) * speedSlider);
                        });
                        window.setTimeout(function() {
                            $('.slider-item').eq(newIndex).find('.slider-title, .slider-descr').fadeIn(speedSlider, function() {
                                curSlider.data('curIndex', newIndex);
                                curSlider.data('disableAnimation', false);
                                if (sliderPeriod > 0 && $('.slider-item').length > 0) {
                                    sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
                                }
                            });
                        }, $('.slider-item').eq(newIndex).find('li').length * speedSlider + speedSlider);
                    }, $('.slider-item').eq(curIndex).find('li').length * speedSlider + speedSlider);
                });
            }
            return false;
        });

        $('.slider-prev').click(function() {
            var curSlider = $('.slider');
            if (!curSlider.data('disableAnimation')) {
                window.clearTimeout(sliderTimer);
                sliderTimer = null;
                curSlider.data('disableAnimation', true);

                var curIndex = curSlider.data('curIndex');
                var newIndex = curIndex - 1;
                if (newIndex < 0) {
                    newIndex = $('.slider-item').length - 1;
                }

                $('.slider-item').eq(curIndex).find('.slider-title, .slider-descr').fadeOut(speedSlider, function() {
                    $('.slider-item').eq(curIndex).find('li').each(function() {
                        var curLi = $(this);
                        var curLiIndex = $('.slider-item').eq(curIndex).find('li').index(curLi);
                        window.setTimeout(function() { curLi.animate({'margin-left': 3000}); }, curLiIndex * speedSlider);
                    });
                    window.setTimeout(function() {
                        $('.slider-item').eq(curIndex).css({'left': 3000});
                        $('.slider-item').eq(newIndex).find('li').css({'margin-left': -3000});
                        $('.slider-item').eq(newIndex).find('.slider-title, .slider-descr').hide();
                        $('.slider-item').eq(newIndex).css({'left': 0});
                        $('.slider-item').eq(newIndex).find('li').each(function() {
                            var curLi = $(this);
                            var curLiIndex = $('.slider-item').eq(newIndex).find('li').index(curLi);
                            window.setTimeout(function() { curLi.animate({'margin-left': 0}); }, curLiIndex * speedSlider);
                        });
                        window.setTimeout(function() {
                            $('.slider-item').eq(newIndex).find('.slider-title, .slider-descr').fadeIn(speedSlider, function() {
                                curSlider.data('curIndex', newIndex);
                                curSlider.data('disableAnimation', false);
                                if (sliderPeriod > 0 && $('.slider-item').length > 0) {
                                    sliderTimer = window.setTimeout(function() { $('.slider-next').trigger('click'); }, sliderPeriod);
                                }
                            });
                        }, $('.slider-item').eq(newIndex).find('li').length * speedSlider + speedSlider);
                    }, $('.slider-item').eq(curIndex).find('li').length * speedSlider + speedSlider);
                });
            }
            return false;
        });

        // форма на странице контактов
        $('.contacts-input input, .contacts-textarea textarea').focus(function() {
            $(this).parent().addClass('focus');
        });

        $('.contacts-input input, .contacts-textarea textarea').blur(function() {
            $(this).parent().removeClass('focus');
        });

        $('.contacts-form form').submit(function() {
            window.clearTimeout(messageTimer);
            messageTimer = null;
            if ($('input[name="name"]').val() != '') {
                $('.message-success').fadeIn();
                messageTimer = window.setTimeout(function() {
                    $('.message').fadeOut();
                }, 3000);
            } else {
                $('.message-error').fadeIn();
                messageTimer = window.setTimeout(function() {
                    $('.message').fadeOut();
                }, 3000);
            }
            return false;
        });

        $('.message-close').click(function() {
            window.clearTimeout(messageTimer);
            messageTimer = null;
            $(this).parent().fadeOut();
            return false;
        });

        // каталог авто
        $('.catalogue').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', false);
        });

        // слайдер фото авто
        $('.catalogue-slider').each(function() {
            var curSlider = $(this);
            curSlider.data('curIndex', 0);
            curSlider.data('disableAnimation', false);

            var newHTML = '';
            curSlider.find('li').each(function() {
                newHTML += '<a href="#"></a>';
            });
            curSlider.find('.catalogue-slider-ctrl').html(newHTML);
            curSlider.find('.catalogue-slider-ctrl a:first').addClass('active');

            var curSliderIndex = $('.catalogue-slider').index(curSlider);
            if (curSlider.find('li').length > 1 && sliderAutoPeriod > 0) {
                sliderAutoTimer[curSliderIndex] = window.setTimeout(function() { gotoNextSliderAuto(curSliderIndex); }, sliderAutoPeriod);
            }
        });

        $('.catalogue-slider-ctrl a').live('click', function() {
            var curLink = $(this);
            if (!curLink.hasClass('active')) {
                var curSlider = curLink.parents().filter('.catalogue-slider');
                var curSliderIndex = $('.catalogue-slider').index(curSlider);
                if (!curSlider.data('disableAnimation')) {
                    var newIndex = curSlider.find('.catalogue-slider-ctrl a').index(curLink);
                    var curIndex = curSlider.data('curIndex');

                    window.clearTimeout(sliderAutoTimer[curSliderIndex]);
                    sliderAutoTimer[curSliderIndex] = null;

                    curSlider.find('.catalogue-slider-ctrl a.active').removeClass('active');
                    curSlider.find('.catalogue-slider-ctrl a').eq(newIndex).addClass('active');

                    curSlider.data('disableAnimation', true);
                    curSlider.find('li').eq(curIndex).css({'position': 'absolute', 'z-index': 2});
                    curSlider.find('li').eq(newIndex).css({'position': 'relative', 'z-index': 1, 'display': 'block'});
                    curSlider.find('li').eq(curIndex).fadeOut(speedAutoSlider, function() {
                        curSlider.data('disableAnimation', false);
                        curSlider.data('curIndex', newIndex);
                        if (curSlider.find('li').length > 1 && sliderAutoPeriod > 0) {
                            sliderAutoTimer[curSliderIndex] = window.setTimeout(function() { gotoNextSliderAuto(curSliderIndex); }, sliderAutoPeriod);
                        }
                    });
                }
            }

            return false;
        });

        $('.catalogue-menu-item a').hover(
            function() {
                $(this).parent().addClass('catalogue-menu-item-hover');
            },

            function() {
                $(this).parent().removeClass('catalogue-menu-item-hover');
            }
        );

        $('.catalogue-menu-inner').each(function() {
            $('.catalogue-menu-inner').data('enableMove', false);
            $('.catalogue-menu-inner').data('curLeft', 0)
        });

        $('.catalogue-menu-inner').mouseover(function(e) {
            var curSlider = $(this);
            var curWidthWindow = curSlider.width();
            var curWidthPartners = curSlider.find('ul').width();
            if (!curSlider.data('enableMove')) {
                if (curWidthPartners > curWidthWindow) {
                    if ((curSlider.offset().left < e.pageX) && (e.pageX < curSlider.offset().left + (curWidthWindow / 3))) {
                        $('.catalogue-menu-inner').data('enableMove', true);
                        catalogueMenuPrev();
                    } else if ((curSlider.offset().left + (curWidthWindow / 3 * 2) < e.pageX) && (e.pageX < (curSlider.offset().left + curWidthWindow))) {
                        $('.catalogue-menu-inner').data('enableMove', true);
                        catalogueMenuNext();
                    }
                }
            }
        });

        $('.catalogue-menu-inner').mouseout(function() {
            $('.catalogue-menu-inner').data('enableMove', false);
        });

        $('.catalogue-menu-item a').click(function() {
            var curItem = $(this).parent().parent();
            var curIndex = $('.catalogue-menu-inner li').index(curItem);
            $('.catalogue-menu-inner li').removeClass('active');
            curItem.addClass('active');
            $('.catalogue-menu-active').css({'left': $('.catalogue-menu-inner li.active .catalogue-menu-item').offset().left - $('.catalogue-menu-inner').offset().left});
            $('.catalogue').data('curIndex', curIndex);
            $('.catalogue-list').animate({'left': -curIndex * $('.catalogue-item:first').width()});
            history.pushState(null, null, this.href);
            return false;
        });

        $('.slider-item a').click(function() {
            $('nav li').eq(1).find('a').trigger('click');
            $('.catalogue-menu li a[href="' + $(this).attr('href') + '"]').trigger('click');
            return false;
        });

        $('.catalogue-menu').mouseover(function() {
            window.clearTimeout(catalogueTimer);
            catalogueTimer = null;
        });

        $('.catalogue-menu').mouseout(function() {
            window.clearTimeout(catalogueTimer);
            catalogueTimer = null;
            catalogueTimer = window.setTimeout(function() { $('.catalogue-menu').slideUp(); }, catalogueHide);
        });

        $(document).mousemove(function(e) {
            if (e.pageY > 218 && e.pageY < 315) {
                window.clearTimeout(catalogueTimer);
                catalogueTimer = null;
                $('.catalogue-menu').slideDown();
            }
        });

        $('.catalogue-info-link a').click(function() {
            $('nav li').eq(4).find('a').trigger('click');
            return false;
        });

    });

    // корректировка размеров страниц
    $(window).bind('load resize', function() {
        var curWidth = $(window).width();
        var curHeight = $(window).height() - 260;
        $('section').css({'min-height': curHeight + 'px'});
        if (curHeight > 960) {
            $('.catalogue-item').css({'width': curWidth, 'min-height': curHeight + 'px'});
        } else {
            $('.catalogue-item').css({'width': curWidth, 'min-height': 960 + 'px'});
        }
        $('.catalogue-list').width($('.catalogue-item').length * $('.catalogue-item:first').width());
        $('.catalogue-list').css({'left': -$('.catalogue').data('curIndex') * $('.catalogue-item:first').width()});

        var menuWidth = curWidth / 8;
        if (curWidth < 1000) {
            menuWidth = 1000 / 8;
        } else if (curWidth > 1280) {
            menuWidth = 1280 / 8;
        }
        $('.catalogue-menu-inner li').css({'width': menuWidth});
        $('.catalogue-menu-inner ul').css({'width': $('.catalogue-menu-inner li').length * menuWidth});
        $('.catalogue-menu-active').css({'left': $('.catalogue-menu-inner li.active .catalogue-menu-item').offset().left - $('.catalogue-menu-inner').offset().left});
    });

    $(window).load(function() {
        var curURL = window.location.href;
        $('nav a').each(function() {
            var curHref = $(this).attr('href').replace(/\//g, '');
            if (curURL.indexOf(curHref) > -1) {
                $(this).trigger('click');
            }
        });
        $('.catalogue-menu-item a').each(function() {
            var curHref = $(this).attr('href').replace(/\//g, '');
            var curHref = curHref.replace(/catalogue/g, '');
            if (curURL.indexOf(curHref) > -1) {
                $(this).trigger('click');
            }
        });
    });

    function gotoNextSliderAuto(curSliderIndex) {
        var curSlider = $('.catalogue-slider').eq(curSliderIndex);
        if (!curSlider.data('disableAnimation')) {
            var curIndex = curSlider.data('curIndex');
            var newIndex = curIndex + 1;
            if (newIndex > curSlider.find('li').length - 1) {
                newIndex = 0;
            }

            window.clearTimeout(sliderAutoTimer[curSliderIndex]);
            sliderAutoTimer[curSliderIndex] = null;

            curSlider.find('.catalogue-slider-ctrl a.active').removeClass('active');
            curSlider.find('.catalogue-slider-ctrl a').eq(newIndex).addClass('active');

            curSlider.data('disableAnimation', true);
            curSlider.find('li').eq(curIndex).css({'position': 'absolute', 'z-index': 2});
            curSlider.find('li').eq(newIndex).css({'position': 'relative', 'z-index': 1, 'display': 'block'});
            curSlider.find('li').eq(curIndex).fadeOut(speedAutoSlider, function() {
                curSlider.data('disableAnimation', false);
                curSlider.data('curIndex', newIndex);
                if (curSlider.find('li').length > 1 && sliderAutoPeriod > 0) {
                    sliderAutoTimer[curSliderIndex] = window.setTimeout(function() { gotoNextSliderAuto(curSliderIndex); }, sliderAutoPeriod);
                }
            });
        }
    }

    function catalogueMenuPrev() {
        var curSlider = $('.catalogue-menu-inner');
        if (curSlider.data('enableMove')) {
            var curWidthWindow = curSlider.width();
            var curWidthPartners = curSlider.find('ul').width();
            if (curWidthPartners > curWidthWindow) {
                var curLeft = curSlider.data('curLeft');
                curLeft -= 1;
                if (curLeft <= 0) {
                    curLeft = 0;
                }
                curSlider.data('curLeft', curLeft);
                curSlider.find('ul').css({'left': -curLeft});
                $('.catalogue-menu-active').css({'left': $('.catalogue-menu-inner li.active .catalogue-menu-item').offset().left - $('.catalogue-menu-inner').offset().left});
                window.setTimeout(catalogueMenuPrev, 10);
            }
        }
    }

    function catalogueMenuNext() {
        var curSlider = $('.catalogue-menu-inner');
        if (curSlider.data('enableMove')) {
            var curWidthWindow = curSlider.width();
            var curWidthPartners = curSlider.find('ul').width();
            if (curWidthPartners > curWidthWindow) {
                var curLeft = curSlider.data('curLeft');
                curLeft += 1;
                if (curWidthWindow >= (curWidthPartners - curLeft)) {
                    curLeft = curWidthPartners - curWidthWindow;
                }
                curSlider.data('curLeft', curLeft);
                curSlider.find('ul').css({'left': -curLeft});
                $('.catalogue-menu-active').css({'left': $('.catalogue-menu-inner li.active .catalogue-menu-item').offset().left - $('.catalogue-menu-inner').offset().left});
                window.setTimeout(catalogueMenuNext, 10);
            }
        }
    }

})(jQuery);