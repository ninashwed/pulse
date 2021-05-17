
$(document).ready(function(){
    /* $('.carousel__inner').slick({
            speed: 1000,
            adaptiveHeight: true, 
            prevArrow: '<button type="button" class="slick-prev"><img src="img/left.png" alt="arrow"/></button>',
            nextArrow: '<button type="button" class="slick-next"><img src="img/right.png" alt="arrow"/></button>',
            responsive: [
                {
                  breakpoint: 992,
                  settings: {

                  }
                },
            ]
        }
    ); */
    const slider = tns({
      container: '.carousel__inner',
      items: 1,
      slideBy: 'page',
      autoplay: false,
      controls: false,
      navPosition: 'bottom',
      nav: false,
      responsive: {
          480: {
            nav: true,
          },
          768: {
            nav: true,     
          },
          992: {
            nav: false,
          }
        }
  
    });
  
    document.querySelector('.prev').addEventListener('click', function() {
      slider.goTo('prev');
    });
    document.querySelector('.next').addEventListener('click', function() {
      slider.goTo('next');
    });
            
        
        $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
          $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
        });

/*         $('.catalog-item__link').each(function(i){
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        });
        $('.catalog-item__back').each(function(i){
          $(this).on('click', function(e){
            e.preventDefault();
            $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
            $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
          })
        }); */
        
        function toggleSlide(item){
          $(item).each(function(i){
            $(this).on('click', function(e){
              e.preventDefault();
              $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
              $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            })
          });
        };
        toggleSlide('.catalog-item__link');
        toggleSlide('.catalog-item__back');

        //modal//

        $('[data-modal=consultation]').on('click', function() {
          $('.overlay, #consultation').fadeIn('slow');
        });

        $('.modal__close').on('click', function(){
          $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
        });

        $('.button_mini').on('click', function(){
          $('.overlay, #order').fadeIn('slow');
        });

        $('.button_mini').each(function(i){
          $(this).on('click', function(){
            $('#order .modal__description').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
          })
        });

  

        function validateForm(form){
          $(form).validate({
            rules: {
              name: {
                required: true,
                minlength: 2        
              },
              phone: "required",
              email: {
                required: true,
                email: true
              }
            },
            messages: {
              name: {
                required: "Пожалуйста введите свое имя",
                minlength: jQuery.validator.format("Минимальное количество символов - {0}!")
              },
              phone: "Введите ваш номер телефона",
              email: {
                required: "Введите ваш e-mail",
                email: "Ваш e-mail должен быть в формате name@domain.com"
              }
            }
          });
        };
        validateForm('#consultation-form');
        validateForm('#consultation form');
        validateForm('#order form');

        $('[name=phone]').mask('+375(29)999-99-99');

        $('form').submit(function(e){
          e.preventDefault();
          $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
          }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
          });
          return false;
        });
        //scrol pageup//

        $(window).scroll(function(){
          if ($(this).scrollTop() > 1600){
            $('.pageup').fadeIn();
          } else {
            $('.pageup').fadeOut();
          }
        });

        $("a[href^='#up']").click(function(){
          const _href = $(this).attr("href");
          $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
          return false;
  });
});


