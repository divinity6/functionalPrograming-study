/**
 * 프로그람 설명문서 주석
 * 2022.05. 28
 *
 *
 *           ===== 암묵적 입력과 출력은 적을수록 좋다 =====
 *
 *      - 인자가 아닌 모든 입력은 암묵적 입력,
 *        리턴 값이 아닌 출력은 모두 암묵적 출력
 *        ( 암묵적 입,출력이 없는 함수 ===> 계산 )
 *
 *      - 어떤 함수에 암묵적 입력과 출력이 있다는 것 --> 다른 컴포넌트와 강하게 연결되어 있음
 *        ( 다른 곳에서 사용할 수 없기 때문에 모듈이 아님 )
 *
 *      --> 무조건 잘게 쪼갠다고 좋은게 아니라, 의미없이 쪼갠애들은
 *          하나로 묶는것도 좋은거가틈
 *
 *          ===== 의미 있는 계층 =====
 *
 *      - 아, 직접 세부적인 프로퍼티를 파라메타로 넘기는 것보다 하나의 객체로 묶어서 넘기면,
 *        사용하는 함수에서 모든 프로퍼티를 알 필요가 없으니, 객체를 확장하기가 좋구나
 */
title( '더 좋은 액션 맨들기' );
{
    var shopping_cart = [];  // 전역 변수는 액션
    var shopping_cart_total = 0; // 전역 변수는 액션

    function add_item_to_cart( name , price ){
        var item = make_cart_item( name , price );
        shopping_cart = add_item( shopping_cart , item );
        var total = calc_total( shopping_cart );

        set_cart_total_dom( total );
        update_shipping_icons( shopping_cart );
        update_tax_dom( total );
    }

    // cart 에 대한 동작
    function add_item( cart , item ){
        return add_element_last( cart , item );
    }

    // 배열 유틸리티
    function add_element_last( array , elem ){
        var new_array = array.slice();
        new_array.push( elem );
        return new_array;
    }

    // item 에 대한 동작
    function make_cart_item( name , price ){
        return { name , price };
    }

    // cart 에 대한 동작 및 item 에 대한 동작, 비즈니스 규칙들이 전부 묶여있다
    function calc_total( cart ){
        var total = 0;
        for( var i = 0; i < cart.length; i++ ){
            var item = cart[ i ];
            total += item.price;
        }
        return total;
    }

    // 바뀌지 않은 함수
    function gets_free_shipping( cart ){
        return calc_total( cart );
    }

    function calc_tax( amount ){
        return amount * 0.10;
    }

    function update_shipping_icons( cart ){
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

    // -----> 리팩터링
    function update_shipping_icons( cart ){
        var buy_buttons = get_buy_buttons_dom();
        for ( var i = 0; i < buy_buttons.length; i++ ){
            var button = buy_buttons[ i ];
            var item = button.item;

            var hasFreeShipping = gets_free_shipping_with_item( cart , item );

            set_free_shipping_icon( button , hasFreeShipping );
        }
    }

    function gets_free_shipping_with_item( cart , item ){
        var new_cart = add_item( cart , item );
        return gets_free_shipping( new_cart );
    }

    // DOM 관련 동작
    function set_free_shipping_icon( button , isShown ){
        if ( isShown ){
            button.show_free_shopping_icon();
        }
        else {
            button.hide_free_shopping_icon();
        }
    }

}
/**
 *      - 위의 코드에서 계산을 장바구니, 비즈니스 규칙 , 유틸리티로 나누었다
 *      --> 최종적으로 구분된 그룹, 분리된 계층으로 구성하기 위함
 *
 *      ----> 장바구니는 모든 전자상거래 서비스에서 이용하는 일반적인 규칙
 *
 *      ----> 비즈니스 규칙은 여기에서만 사용하는 특별한 규칙!
 *
 *
 *      - ㅇㅎ 보통 나는 첫 번째 update_shipping_icons 식으로 많이썻지...
 *
 *      --> DOM 에 대한 동작도 이런식으로 나눠버리는구나...
 *
 */