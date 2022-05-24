/**
 * 프로그람 설명문서 주석
 * 2022.05. 24
 *
 *
 *           ===== 액션과 계산, 데이터 구분 =====
 *
 *      - 모든 함수에는 입력과 출력이 있다
 *      --> 함수를 부르는 이유는 출력 값을 얻기 위함
 */
title( '액션과 계산, 데이터 구분' );
{
    var shopping_cart = [];  // 전역 변수는 액션
    var shopping_cart_total = 0; // 전역 변수는 액션

    function add_item_to_cart( name , price ){
        shopping_cart.push( { name , price } ); // 전역 변수 변경도 액션
        calc_cart_total();
    }

    function calc_cart_total(){
        shopping_cart_total = 0; // 전역변수 변경 - 액션
        for ( var i = 0; i < shopping_cart.length; i++ ){
            var item = shopping_cart[ i ];
            shopping_cart_total += item.price;
        }
        set_cart_total_dom();
        update_shipping_icons();
        update_tax_dom();
    }

    function set_cart_total_dom(){
        console.log( 'DOM 을 업데이트하는 함수입니다' )
    }


    function update_shipping_icons() {
        var buy_buttons = get_buy_buttons_dom(); // 돔을 읽어오는 것 - 액션
        for ( var i = 0; i < buy_buttons.length; i++ ){
            var button = buy_buttons[ i ];
            var item = button.item;
            if ( item.price + shopping_cart_total >= 20 ){
                button.show_free_shopping_icon(); // DOM 을 바꾸는 것 - 액션
            }
            else {
                button.hide_free_shopping_icon(); // DOM 을 바꾸는 것 - 액션
            }
        }
    };

    function get_buy_buttons_dom(){
        return [
            {
                item : {
                    price : 100,
                },
                show_free_shopping_icon : function(){
                    console.log( 'DOM 의 아이콘을 보여줍니다' )
                },
                hide_free_shopping_icon : function(){
                    console.log( 'DOM 의 아이콘을 숨깁니다' )
                }
            }
        ];
    }

    function update_tax_dom(){
        set_tax_dom( shopping_cart_total * 0.10 ); // DOM 변경 - 액션
    }

    function set_tax_dom( tax ){
        console.log( '돔을 업데이트 합니다' );
    }

    /**
     *  - 위 코드는 모든 코드가 액션이다
     *
     *  --> 함수내부에서 하는 동작( 암묵적 동작 )
     *      을 없애고, 파라미터( 명시적 동작 ) 와 return( 명시적 동작 ) 으로 되도록 처리하는 것이 좋다
     *  --> 암묵적 동작이 있으면 액션이 된다
     */

    debugger;
}

/**
 *  - 재사용성있는 코드를 짜기위한 규칙
 *
 *  1. DOM 업데이트와 비즈니스 규칙은 분리되어야 한다
 *
 *  2. 전역변수가 없어야 한다
 *
 *  3. 전역변수에 의존하지 않아야 한다
 *
 *  4. DOM 을 사용할 수 있는 곳에서 실행한다고 가정하면 안된다
 *
 *  5. 함수가 결괏값을 리턴해야 한다
 *
 *
 */
