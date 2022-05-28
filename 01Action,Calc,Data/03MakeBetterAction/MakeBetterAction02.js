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
    // 여기서 item 으로 묶어서 객체로 넘기는거지...( 프로퍼티 단위로 넘기는게 아니라 )
    // 이 함수는 이제 어떤 배열이 들어와도 사용할 수 있음
    function add_item( cart , item ){
        var new_cart = cart.slice();
        new_cart.push( item );
        return new_cart;
    }
    //-----> 아래로 이름 리팩터링
    function add_element_last( array , elem ){
        var new_array = array.slice();
        new_array.push( elem );
        return new_array;
    }

    /**
     *  - add_item 의 item 을 맨들어서 반환( 생성자 함수 )
     */
    function make_cart_item( name , price ){
        return { name , price };
    }

    /**
     *  - 이 함수는 cart 구조를 알아야 한다
     */
    function calc_total( cart ){
        var total = 0;
        for ( var i = 0; i < cart.length; i++ ){
            var item = cart[ i ];
            total += item.price;
        }
        return total;
    }

    /**
     *  - 아래 함수들은 비즈니스 규칙들에 대해 정의하고 있는 함수들
     */
    function gets_free_shipping( cart ){
        return calc_total( cart );
    }

    function calc_tax( amount ){
        return amount * 0.10;
    }
}
