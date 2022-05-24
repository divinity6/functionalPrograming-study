/**
 * 프로그람 설명문서 주석
 * 2022.05. 24
 *
 *
 *           ===== 액션과 계산, 데이터 =====
 *
 *      -
 */
title( '액션과 계산, 데이터가 섞인 최악의 코드' );
{
    var shopping_cart = [];  // 장바구니 제품 금액과 합계를 담고 있는 전역 변수
    var shopping_cart_total = 0;

    function add_item_to_cart( name , price ){
        shopping_cart.push( { name , price } ); // 장바구니에 제품을 담기위해 card 배열에 레코드 추가
        calc_cart_total(); // 금액 합계 업데이트
    }

    function calc_cart_total(){
        shopping_cart_total = 0;
        for ( var i = 0; i < shopping_cart.length; i++ ){
            var item = shopping_cart[ i ];
            shopping_cart_total += item.price; // 모든 제품 값 더하기
        }
        set_cart_total_dom();
        update_shipping_icons(); // 아이콘을 업데이트하는 코드 추가
        update_tax_dom();
    }

    function set_cart_total_dom(){
        console.log( 'DOM 을 업데이트하는 함수입니다' )
    }

    // 쇼핑 아이콘 업데이트 - 절차형 코드
    function update_shipping_icons() {
        var buy_buttons = get_buy_buttons_dom();
        for ( var i = 0; i < buy_buttons.length; i++ ){
            var button = buy_buttons[ i ];
            var item = button.item;
            if ( item.price + shopping_cart_total >= 20 ){
                button.show_free_shopping_icon();
            }
            else {
                button.hide_free_shopping_icon();
            }
        }
    };

    // dom icon 을 보여주고 안보여주고 하는것
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

    // 세금 계산
    function update_tax_dom(){
        set_tax_dom( shopping_cart_total * 0.10 );
    }

    function set_tax_dom( tax ){
        console.log( '돔을 업데이트 합니다' );
    }

    /**
     *  - 위 코드를 재사용하기 위한 조건
     *
     *  1. 전역변수에 의존하지 않아야 함
     *
     *  2. DOM 을 사용할 수 있는 곳에서 실행된다고 가정하면 안된다
     *
     *  3. 함수가 결괏값을 리턴해야 한다
     */

    debugger;
}
