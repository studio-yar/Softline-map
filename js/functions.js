$(function(){
	// Проверка браузера
	if ( !supportsCssVars() ) {
		$('body').addClass('lock')
		$('.supports_error').addClass('show')
	}


	// Ленивая загрузка
	setTimeout(function(){
		observer = lozad('.lozad', {
			rootMargin: '200px 0px',
			threshold: 0,
			loaded: function(el) {
				el.classList.add('loaded')
			}
		})

		observer.observe()
	}, 200)


	// Установка ширины стандартного скроллбара
	$(':root').css('--scroll_width', widthScroll() +'px')


	// Всплывающие окна
	$('.modal_link').click(function(e){
		e.preventDefault()

		$.fancybox.close()

		$.fancybox.open({
			src  : $(this).data('content'),
			type : 'inline',
			opts : {
				touch : false,
				speed : 300,
				backFocus : false,
				trapFocus : false,
				autoFocus : false,
				mobile : {
				    clickSlide: "close"
				}
			}
		})
	})


	// Увеличение картинки
	$('.fancy_img').fancybox({
		backFocus : false,
		mobile : {
		    clickSlide: "close"
		}
	})


	// Моб. меню
	$('body').on('click', '.mob_menu_link', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')

			$('header').fadeOut(300)
		} else {
			$(this).addClass('active')

			$('header').fadeIn(300)
		}
    })


	// Моб. Поиск
	$('.mob_header .search .link').click(function(e){
		e.preventDefault()

		$('.mob_header .search form').fadeIn(300)
	})

	$('.mob_header .search .close').click(function(e){
		e.preventDefault()

		$('.mob_header .search form').fadeOut(200)
	})


	// Маска ввода
	$('input[type=tel]').inputmask('+7 (999) 99-99-999')

	// Кастомный select
	$('select').niceSelect()


	// Табы
	var locationHash = window.location.hash

	if ( $('.trees').length && $('.trees .tab_content').hasClass('active') ) {
		if ( $('.decisions_tree .carousel').hasClass('owl-loaded') ) {
			if( typeof $decisions_tree != 'undefined' ){
				$decisions_tree.trigger('destroy.owl.carousel')
			}
		}

		carousels()
	}

	$('body').on('click', '.tabs button', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent    = $(this).closest('.tabs_container')
			let activeTab = $(this).data('content')
			let level     = $(this).data('level')

			parent.find('.tabs:first button').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			$(activeTab).addClass('active')

			if ( parent.hasClass('tabs_accordion') ) {
				let IndexN = $(this).index()

				$(this).closest('.tabs_accordion').find('.item_accordion .open_btn').removeClass('active')

				$(this).closest('.tabs_accordion').find('.item_accordion:eq(' + IndexN + ') .open_btn').addClass('active')
			}

			if ($('.trees').length) {
				if ( $('.vendors_tree .carousel').hasClass('owl-loaded') ) {
					if( typeof $vendors_tree != 'undefined' ){
						$vendors_tree.trigger('destroy.owl.carousel')
					}
				}

				if ( $('.responsible_tree .carousel').hasClass('owl-loaded') ) {
					if( typeof $responsible_tree != 'undefined' ){
						$responsible_tree.trigger('destroy.owl.carousel')
					}
				}

				if ( $('.decisions_tree .carousel').hasClass('owl-loaded') ) {
					if( typeof $decisions_tree != 'undefined' ){
						$decisions_tree.trigger('destroy.owl.carousel')
					}
				}

				carousels()
			}
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $('.tabs button[data-content=' + locationHash + ']')
		let parent    = activeTab.closest('.tabs_container')
		let level     = activeTab.data('level')

		parent.find('.tabs:first button').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		$(locationHash).addClass('active')

		if ( parent.hasClass('tabs_accordion') ) {
			let IndexN = $(activeTab).index()

			$(activeTab).closest('.tabs_accordion').find('.item_accordion .open_btn').removeClass('active')

			$(activeTab).closest('.tabs_accordion').find('.item_accordion:eq(' + IndexN + ') .open_btn').addClass('active')
		}

		if ( $('.vendors_tree .carousel').hasClass('owl-loaded') ) {
			if( typeof $vendors_tree != 'undefined' ){
				$vendors_tree.trigger('destroy.owl.carousel')
			}
		}

		if ( $('.responsible_tree .carousel').hasClass('owl-loaded') ) {
			if( typeof $responsible_tree != 'undefined' ){
				$responsible_tree.trigger('destroy.owl.carousel')
			}
		}

		if ( $('.decisions_tree .carousel').hasClass('owl-loaded') ) {
			if( typeof $decisions_tree != 'undefined' ){
				$decisions_tree.trigger('destroy.owl.carousel')
			}
		}

		carousels()

		$('html, body').stop().animate({
			scrollTop: $(locationHash).offset().top
		}, 1000)
	}


	// Аккордион
	$('body').on('click', '.tabs_accordion .item_accordion .open_btn', function(e) {
		e.preventDefault()

		if( !$(this).hasClass('active') ) {
			let parent = $(this).closest('.item_accordion')

			let IndexN = parent.index()

			$(this).addClass('active')

			$(this).closest('.tabs_container').find('.tabs button:eq(' + IndexN + ')').trigger('click')
		}
	})


    // Плавная прокрутка к якорю
	$('body').on('click', '.scroll_link', function(e) {
		e.preventDefault()

		let href = $(this).data('anchor')

		$('html, body').stop().animate({
		   	scrollTop: $(href).offset().top
		}, 1000)


		if ( $(window).width() < 1024 ) {
			$('.mob_menu_link').removeClass('active')

			$('header').fadeOut(300)
		}
	})


	// Мини всплывающие окна
	firstClick = false

	$('.mini_modal_link').click(function(e){
	    e.preventDefault()

	    let modalId = $(this).data('modal-id')

	    if( $(this).hasClass('active') ){
	        $(this).removeClass('active')
	      	$('.mini_modal').removeClass('active')

	        firstClick = false

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'default')
			}

			$('.overlay').fadeOut(200)
	    }else{
	        $('.mini_modal_link').removeClass('active')
	        $(this).addClass('active')

	        $('.mini_modal').removeClass('active')
	        $(modalId).addClass('active')

	        firstClick = true

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'pointer')
			}

			$('.overlay').fadeIn(200)
	    }
	})

	// Закрываем всплывашку при клике за её пределами
	$(document).click(function(e){
	    if ( !firstClick && $(e.target).closest('.mini_modal').length == 0 ){
	    	if( $('.mini_modal_link').hasClass('active') ){
				$('.overlay').fadeOut(200)
			}

	        $('.mini_modal, .mini_modal_link').removeClass('active')

			if( $(window).width() < 1024 ){
				$('body').css('cursor', 'default')
			}
	    }

	    firstClick = false
	})

	// Закрываем всплывашку при клике на крестик во всплывашке
	$('body').on('click', '.mini_modal .close', function(e) {
	    e.preventDefault()

	    $('.mini_modal, .mini_modal_link').removeClass('active')

	    if( $(window).width() < 1024 ){
			$('body').css('cursor', 'default')
		}

		$('.overlay').fadeOut(200)

	    firstClick = false
	})

    // Результаты поиска
    $('.search .input').keyup(function() {
        var length = $(this).val().length;
        var parent = $(this).closest('.search_box');

        if (length > 0) {
        	$(this).addClass('full');
        	parent.find('.search_results').slideDown()
        } else{
        	$(this).removeClass('full');
        	parent.find('.search_results').slideUp()
        }
    })



	// Меню в шапке
	$('body').on('click', '.open_links_btn button', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')

			$('header .user_wrap .links').removeClass('visible')
		} else {
			$(this).addClass('active')

			$('header .user_wrap .links').addClass('visible')
		}
    })


	// Моб поиск
	$('body').on('click', '.mob_search_btn button', function(e) {
    	e.preventDefault()

		if( $(this).hasClass('active') ) {
			$(this).removeClass('active')

			$('.search_box.search_mob').removeClass('visible')
		} else {
			$(this).addClass('active')

			$('.search_box.search_mob').addClass('visible')
		}
    })
	$('body').on('click', '.search .search_close', function(e) {
    	e.preventDefault()

    	var parent = $(this).closest('.search_box')

		$('.mob_search_btn button').removeClass('active')

		parent.removeClass('visible')
    })
	// Закрываем моб поиск при клике за его пределами
	$(document).mouseup(function (e){
        var block = $(".search_box.search_mob");
        if (!block.is(e.target) && block.has(e.target).length === 0) {
            block.removeClass('visible');
			$('.mob_search_btn button').removeClass('active')
        }
    });

	// Выбор всех чекбоксов из набора
    $('body').on('click', '.choice_js label', function() {
		if( !$(this).find('input[type=checkbox]').prop('checked') ){
			$(this).closest('.box').find('.checkbox .label_check input[type=checkbox]').prop('checked', false)
		}else{
			$(this).closest('.box').find('.checkbox .label_check input[type=checkbox]').prop('checked', true)
		}
    })

	// Открытие всех чекбоксов
    $('body').on('click', '.filter .see_all button', function(e) {
    	e.preventDefault()

    	var parent = $(this).closest('.box');

    	if ( $(this).hasClass('active') ) {
    		$(this).text('Смотреть все').removeClass('active')
    		parent.find('.checkbox.hidden').hide();

    		console.log('clossed')
    	} else{
    		$(this).text('Скрыть').addClass('active')
    		parent.find('.checkbox.hidden').show();
    	}
    })

	// Фильтр
    $('body').on('click', '.filter .head', function(e) {
    	e.preventDefault()

    	var parent = $(this).closest('.filter');

    	if ( parent.hasClass('active') ) {
    		parent.find('.body').slideUp();
    		parent.removeClass('active')
    	} else{
    		parent.addClass('active')
    		parent.find('.body').slideDown();
    	}
    })

	// Фильтр выбор главного чекбокса при всех активных
    $('body').on('click', '.checkbox label', function() {
    	let parent = $(this).closest('.box');

		if( parent.find('.checkbox:not(.choice_js) label input[type=checkbox]:not(:checked)').length ){
			parent.find('.checkbox.choice_js .label_check input[type=checkbox]').prop('checked', false)
		}else{
			parent.find('.checkbox.choice_js .label_check input[type=checkbox]').prop('checked', true)
		}
    })
})


// Вспомогательные функции
function widthScroll() {
    let div = document.createElement('div')
    div.style.overflowY = 'scroll'
    div.style.width = '50px'
    div.style.height = '50px'
    div.style.visibility = 'hidden'
    document.body.appendChild(div)

    let scrollWidth = div.offsetWidth - div.clientWidth
    document.body.removeChild(div)

    return scrollWidth
}


var supportsCssVars = function() {
    var s = document.createElement('style'),
        support

    s.innerHTML = ":root { --tmp-var: bold; }"
    document.head.appendChild(s)
    support = !!(window.CSS && window.CSS.supports && window.CSS.supports('font-weight', 'var(--tmp-var)'))
    s.parentNode.removeChild(s)

    return support
}


function carousels(){
	if ( !$('.tab_content.active > .decisions_tree .carousel').hasClass('owl-loaded') ) {
		$decisions_tree = $('.tab_content.active > .decisions_tree .carousel').owlCarousel({
			nav: true,
			loop: false,
			dots: false,
			smartSpeed: 500,
			fluidSpeed: 100,
			mouseDrag: false,
			onInitialized: callback1,
			onTranslate: callback1,
			responsive: {
				// breakpoint from 1200 up
				1200 : {
					items: 3,
					margin: 30,
				},
				// breakpoint from 1024 up
				1024 : {
					items: 3,
					margin: 18,
				},
				// breakpoint from 320 up
				0 : {
					items: 1,
					margin: 18,
				},
			},
		})

		function callback1(event) {
			var size      = event.page.size;
			var item      = event.item.index;
			var items     = event.item.count;
			var parent = event.relatedTarget.$element.closest('.decisions_tree')

			parent.find('.counter .this').text(item + 1)
			parent.find('.counter .all').text(items)
		}
	}

	if ( !$('.tab_content.active > .responsible_tree .carousel').hasClass('owl-loaded') ) {
		$responsible_tree =$('.tab_content.active > .responsible_tree .carousel').owlCarousel({
			items: 3,
			margin: 30,
			nav: true,
			dots: false,
			loop: false,
			smartSpeed: 500,
			fluidSpeed: 100,
			mouseDrag: false,
			onInitialized: callback2,
			onTranslate: callback2,
			responsive: {
				// breakpoint from 1200 up
				1200 : {
					items: 3,
					margin: 30,
				},
				// breakpoint from 1024 up
				1024 : {
					items: 3,
					margin: 18,
				},
				// breakpoint from 320 up
				0 : {
					items: 1,
					margin: 18,
				},
			},
		})

		function callback2(event) {
			var size      = event.page.size;
			var item      = event.item.index;
			var items     = event.item.count;
			var parent = event.relatedTarget.$element.closest('.responsible_tree')

			parent.find('.counter .this').text(item + 1)
			parent.find('.counter .all').text(items)
		}
	}


	if ( !$('.tab_content.active > .vendors_tree .carousel').hasClass('owl-loaded') ) {
		$vendors_tree = $('.tab_content.active > .vendors_tree .carousel').owlCarousel({
			margin: 18,
			nav: true,
			dots: true,
			loop: true,
			smartSpeed: 500,
			fluidSpeed: 100,
			dotsEach: true,
		    lazyLoad: true,
		    loop: true,
			onInitialized: function(event){
				var index      = event.page.index;
				let currentIndex = event.item.index - event.relatedTarget._clones.length / 2
				var parent = event.relatedTarget.$element.closest('.vendors_tree')
				let activeItems = $(this)[0].settings.items;
				let itemsCount = $(this)[0]._items.length;

				parent.find('.thumbs .item').removeClass('active')

				if (currentIndex + activeItems > itemsCount) {
					let difference = (currentIndex + activeItems) - itemsCount;

					for (var i = 0; i < difference; i++) {
						parent.find('.thumbs .item:eq(' + i + ')').addClass('active')
					}
				}

				for (var i = 0; i < activeItems; i++) {
					parent.find('.thumbs .item:eq(' + currentIndex + ')').addClass('active')

					currentIndex++
				}
			},
			onTranslate: function(event){
				var index      = event.page.index;
				let currentIndex = event.item.index - event.relatedTarget._clones.length / 2
				var parent = event.relatedTarget.$element.closest('.vendors_tree')
				let activeItems = $(this)[0].settings.items;
				let itemsCount = $(this)[0]._items.length;

				parent.find('.thumbs .item').removeClass('active')

				if (currentIndex + activeItems > itemsCount) {
					let difference = (currentIndex + activeItems) - itemsCount;

					for (var i = 0; i < difference; i++) {
						parent.find('.thumbs .item:eq(' + i + ')').addClass('active')
					}
				}

				for (var i = 0; i < activeItems; i++) {
					parent.find('.thumbs .item:eq(' + currentIndex + ')').addClass('active')

					currentIndex++
				}
			},
			responsive: {
				// breakpoint from 1200 up
				1200 : {
					items: 4,
					margin: 18,
				},
				// breakpoint from 1024 up
				1024 : {
					items: 3,
					margin: 18,
				},
				// breakpoint from 768 up
				768 : {
					items: 2,
					margin: 40,
				},
				// breakpoint from 480 up
				480 : {
					items: 2,
					margin: 24,
				},
				// breakpoint from 320 up
				0 : {
					items: 2,
					margin: 24
				}
			}
		})
	}
}