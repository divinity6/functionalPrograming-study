/**
 * 프로그람 설명문서 주석
 * 2022.05. 24
 *
 *
 *           ===== 액션과 계산, 데이터 구분 =====
 *
 *      - 모든 함수에는 입력과 출력이 있다
 *      --> 함수를 부르는 이유는 출력 값을 얻기 위함
 *
 *      - 코드를 고칠때 동작은 그대로 유지
 */
title( '리팩터링' );
{

    var shopping_cart = [];  // 전역 변수는 액션
    var shopping_cart_total = 0; // 전역 변수는 액션

    function add_item_to_cart( name , price ){
        shopping_cart = add_item( shopping_cart , name , price ); // 암묵적 입력, 출력이 없는 계산
        calc_cart_total();
    }

    function calc_cart_total(){
        shopping_cart_total = calc_total( shopping_cart ); // 함수를 호출하는 쪽에서 전역변수에 값을 할당
        set_cart_total_dom();
        update_shipping_icons( shopping_cart_total );
        update_tax_dom( shopping_cart_total );
    }

    function calc_total( cart ){
        var total = 0; // 지역변수로 변경
        for ( var i = 0; i< cart.length; i++ ){ // 전역변수 대신 파라미터 사용
            var item = cart[ i ];
            total += item.price;
        }
        return total; // 지역변수 리턴
    }

    function set_cart_total_dom(){
        console.log( 'DOM 을 업데이트하는 함수입니다' )
    }

    /**
     * - 기억할것
     * --> 자기자신의 스코프 밖의 값을 읽어오면
     *     데이터가 들어오기 때문에 입력이 된다
     *
     * --> 반대로 스코프 밖의 값을 바꾸면
     *     밖으로 데이터가 나가서 출력이 된다
     */
    function add_item( cart , name , price ){
        var new_cart = cart.slice(); // 복사본을 맨듬
        new_cart.push( { name , price } );
        return new_cart; // 복사본을 리턴
    }

    function update_shipping_icons( cart_total ) {
        var buy_buttons = get_buy_buttons_dom(); // 돔을 읽어오는 것 - 액션
        get_update_icons( buy_buttons , cart_total )
    };

    function get_update_icons( buttons , cart_total ){
        var _buttons = buttons.slice();
        _buttons.forEach( button => {
            if ( gets_free_shipping( button.item.price , cart_total ) ){
                button.show_free_shopping_icon();
            }
            else {
                button.hide_free_shopping_icon();
            }
        } )
    }

    function gets_free_shipping( price , cart_total ) {
        return price + cart_total >= 20;
    }


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


    function update_tax_dom( cart_total ){
        set_tax_dom( calc_tax( cart_total ) ); // DOM 변경 - 액션
    }

    function calc_tax( cart_total ){
        var _cart_total = parseInt( JSON.stringify( cart_total ) );
        return _cart_total * 0.10;
    }

    function set_tax_dom( tax ){
        console.log( '돔을 업데이트 합니다' );
    }

    debugger;
}

/**
 *  - 흠, 대충 이렇게 쪼갠다는 건 직감적으로 알고 있었지만,
 *    이렇게 보니 확실히 구분이 가는군...
 *  --> 해보고 나니 계산로직만을 따로 확실히 구분해야 하네
 */