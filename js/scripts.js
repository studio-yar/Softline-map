$(function(){
	// Слайдеры карт
	$('.carousel_infoSmall .carousel').owlCarousel({
		nav: true,
		loop: false,
		dots: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		mouseDrag: false,
		onInitialized: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}

			var parent = $(event.target).closest('.carousel_infoSmall')

			parent.find('.counter .this').text(event.item.index + event.page.size)
			parent.find('.counter .all').text(event.item.count)
		},
		onRefresh: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}
		},
		onResized: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}
		},
		onTranslate: function(event){
        	var parent = $(event.target).closest('.carousel_infoSmall')

			parent.find('.counter .this').text(event.item.index + event.page.size)
			parent.find('.counter .all').text(event.item.count)
		},
		responsive: {
			// breakpoint from 1200 up
			1200 : {
				items: 3,
				margin: 21,
				autoHeight: false
			},
			// breakpoint from 1024 up
			1024 : {
				items: 2,
				margin: 18,
				autoHeight: false
			},
			// breakpoint from 1024 up
			768 : {
				items: 1,
				margin: 18,
				autoHeight: true
			},
			// breakpoint from 320 up
			0 : {
				items: 1,
				margin: 18,
				autoHeight: true
			}
		}
	})


	$('.carousel_infoMiddle .carousel').owlCarousel({
		nav: true,
		loop: false,
		dots: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		mouseDrag: false,
		onInitialized: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}

			var parent = $(event.target).closest('.carousel_infoMiddle')

			parent.find('.counter .this').text(event.item.index + event.page.size)
			parent.find('.counter .all').text(event.item.count)
		},
		onRefresh: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}
		},
		onResized: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}
		},
		onTranslate: function(event){
        	var parent = $(event.target).closest('.carousel_infoMiddle')

			parent.find('.counter .this').text(event.item.index + event.page.size)
			parent.find('.counter .all').text(event.item.count)
		},
		responsive: {
			// breakpoint from 1200 up
			1200 : {
				items: 3,
				margin: 30,
				autoHeight: false
			},
			// breakpoint from 1024 up
			1024 : {
				items: 3,
				margin: 18,
				autoHeight: false
			},
			// breakpoint from 1024 up
			768 : {
				items: 1,
				margin: 18,
				autoHeight: true
			},
			// breakpoint from 320 up
			0 : {
				items: 1,
				margin: 18,
				autoHeight: true
			}
		}
	})

	$('.carousel_infoBig .carousel').owlCarousel({
		nav: true,
		dots: false,
		smartSpeed: 500,
		fluidSpeed: 100,
		mouseDrag: false,
		onInitialized: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}

			var parent = $(event.target).closest('.carousel_infoBig')

			parent.find('.counter .this').text(event.item.index + event.page.size)
			parent.find('.counter .all').text(event.item.count)
		},
		onRefresh: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}
		},
		onResized: function(event){
        	if (event.item.count > event.page.size) {
        		$(event.target).addClass('full')
        	} else {
        		$(event.target).removeClass('full')
        	}
		},
		onTranslate: function(event){
        	var parent = $(event.target).closest('.carousel_infoBig')

			parent.find('.counter .this').text(event.item.index + event.page.size)
			parent.find('.counter .all').text(event.item.count)
		},
		responsive: {
			// breakpoint from 1200 up
			1200 : {
				items: 4,
				margin: 30,
				autoHeight: false
			},
			// breakpoint from 1024 up
			1024 : {
				items: 3,
				margin: 18,
				autoHeight: false
			},
			// breakpoint from 1024 up
			768 : {
				items: 2,
				margin: 18,
				autoHeight: false
			},
			// breakpoint from 320 up
			0 : {
				items: 1,
				margin: 18,
				autoHeight: true
			}
		}
	})


	$('.vendors_tree .thumbs .item').click(function(e) {
		e.preventDefault()

		const parent = $(this).closest('.vendors_tree')

	    parent.find('.carousel').trigger('to.owl', $(this).data('slide-index'))

	    $(this).addClass('active')
	})
})