/**
 * 프로그람 설명문서 주석
 * 2022.05. 28
 *
 *
 *           ===== 리팩터링된 코드 =====
 *
 *      - A : 액션
 *      - C : 계산
 *      - D : 데이터
 */
title( '리팩터링된 코드' );
{
    var shopping_cart = [];  // A

    function add_item_to_cart( name , price ){ // A
        var item = make_cart_item( name , price );
        shopping_cart = add_item( shopping_cart , item );
        var total = calc_total( shopping_cart );
        set_cart_total_dom( total );
        update_shipping_icons( shopping_cart );
        update_tax_dom( total );
    }

    function update_shipping_icons( cart ){ // A
        var buy_buttons = get_buy_buttons_dom();
        for ( var i = 0; i < buy_buttons.length; i++ ){
            var button = buy_buttons[ i ];
            var item = button.item;
            var new_cart = add_item( cart , item );

            if ( gets_free_shipping( new_cart ) ){
                button.show_free_shopping_icon();
            }
            else {
                button.hide_free_shopping_icon();
            }
        }
    }

    function update_tax_dom( cart_total ){ // A
        set_tax_dom( calc_tax( cart_total ) );
    }

    // 배열 유틸리티
    function add_element_last( array , elem ){ // C
        var new_array = array.slice();
        new_array.push( elem );
        return new_array;
    }

    // cart 에 대한 동작
    function add_item( cart , item ){ // C
        return add_element_last( cart , item );
    }

    // item 에 대한 동작
    function make_cart_item( name , price ){ // C
        return { name , price };
    }

    // cart 에 대한 동작 및 item 에 대한 동작, 비즈니스 규칙들이 전부 묶여있다
    function calc_total( cart ){ // C
        var total = 0;
        for( var i = 0; i < cart.length; i++ ){
            var item = cart[ i ];
            total += item.price;
        }
        return total;
    }

    // 바뀌지 않은 함수
    function gets_free_shipping( cart ){ // C
        return calc_total( cart );
    }

    function calc_tax( amount ){ // C
        return amount * 0.10;
    }
}

/**
 *  - 이제 액션은 데이터 구조에 대해서는 몰라도 된다
 *  --> 재사용할 수 있는 인터페이스 함수가 많이 생김
 */