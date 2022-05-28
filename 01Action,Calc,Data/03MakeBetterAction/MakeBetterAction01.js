/**
 * 프로그람 설명문서 주석
 * 2022.05. 25
 *
 *
 *           ===== 더 좋은 액션 맨들기 =====
 *
 */
title( '더 좋은 액션 맨들기' );
{
    /**
     *  - 이 함수의 인자는 요구사항과 맞지 않는 인자이다
     *  --> 요구사항 : 제품이 무료인지 확인하는 것
     */
    function gets_free_shipping( price , cart_total ) {
        return price + cart_total >= 20;
    }
    debugger;

    /**
     *  - 요구사항과 맞지 않기 때문에 엄밀히 말하면 리팩터링이 아님
     *  --> 중복되는 코드 제거
     *
     */
    function gets_free_shipping( cart ){
        return calc_total( cart ) >= 20;
    }

    function calc_total( cart ){
        var total = 0; // 지역변수로 변경
        for ( var i = 0; i< cart.length; i++ ){ // 전역변수 대신 파라미터 사용
            var item = cart[ i ];
            total += item.price;
        }
        return total; // 지역변수 리턴
    }

    function get_update_icons( buttons , cart ) {
        var _buttons = buttons.slice();
        _buttons.forEach(button => {
            var item = button.item;
            /**
             *  - 여기서 add_item 을 한번 더 호출해서 넘겨주도록 하는 것이군.
             */
            var new_cart = add_item( cart , item.name ,item.price );
            if (gets_free_shipping(new_cart)) {
                button.show_free_shopping_icon();
            } else {
                button.hide_free_shopping_icon();
            }
        })
    }

    function add_item( cart , name , price ){
        var new_cart = cart.slice(); // 복사본을 맨듬
        new_cart.push( { name , price } );
        return new_cart; // 복사본을 리턴
    }
}
