/**
 * 프로그람 설명문서 주석
 * 2022.05. 29
 *
 *
 *           ===== 추상화의 벽( abstraction barrier ) =====
 *
 *      - 추상화의 벽으로 좋은 설계를 맨들 수 있지만 모든 곳에 사용하는 것은 아니다
 *      --> 추상화의 벽을 사용해야할 곳
 *
 *      1. 쉽게 구현을 바꾸기 위해
 *      --> 구현에 대한 확신이 없을 경우, 나중에 구현을 바꾸기 쉽다
 *          ( 최선의 구현을 확신할 수 없는 작업에 )
 *      --> 만약을 대비해 코드를 만드는 것은 좋지 않은 습관이다
 *          ( 쓸데없는 코드를 줄이는 것이 좋다 )
 *
 *      2. 코드를 읽고 쓰기 쉽게 만들기 위해
 *      --> 구체적인 것이 버그를 만든다. 적절한 것을 감추면 숙련된 프로그래머가 아니어도
 *          생산적인 코드를 맨들 수 있다
 *
 *      3. 팀 간에 조율해야 할 것을 줄이기 위해
 *      --> 추상화의 벽을 사용하면 각 팀에 관한 구체적인 내용을 서로 신경쓰지 않아도 된다
 *
 *      4. 주어진 문제에 집중하기 위해
 *      --> 추상화의 벽을 사용하면 해결하려는 문제의 구체적인 부분을 무시할 수 있다
 *          ( 코드의 실수를 줄이고, 맨들면서 지치지 않을 수 있음 )
 *
 */

/**
 *           ===== 정리 =====
 *
 *      - 추상화의 벽으로 벽 위와 아래 코드간의 의존성을 없앨 수 있다
 *      --> 서로 신경쓰지 않아도 되는 구체적인 것을 벽 기준으로 나눠 의존하지 않게 한다
 *
 *      1. 일반적으로 추상화 벽 위에 있는 코드는 데이터 구조와 같은 구체적인 내용은 신경쓰지
 *         않아도 된다
 *
 *      2. 추상화 벽의 아래에 있는 코드들은 높은 수준의 계층에서 함수가 어떻게 사용되는지 몰라도 된다
 *      --> 신경 쓰지 않아도 되는 것을 다루는 것이 추상화 벽의 핵심이다
 *          사람들이 몰라도 되는 것은 어떤 것인가?
 *
 *      - 코드 줄 수는 중요하지 않다
 *      --> 중요한 것은 코드가 적절한 구체화 수준과 일반화가 되어있는가이다.
 *      ----> 일반적으로 한줄짜리 코드는 여러 구체화 수준이 섞일 일이 없기 때문에 좋은 코드다
 */
title( '데이터 구조를 변경한 후 함수 형태' );
{
    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }

    function add_item( cart , item ){
        return objectSet( cart , item.name , item );
    }

    function gets_free_shipping( cart ){
        return calc_total( cart ) >= 20;
    }

    function cartTax( cart ){
        return calc_tax( calc_total( cart ) );
    }

    function remove_item_by_name( cart , name ){
        return objectDelete( cart , name );
    }

    function isInCart( cart , name ){
        return cart.hasOwnProperty( name );
    }

    // ----- 아래는 복잡한 코드 -----

    // 합계 계산하기
    function calc_total( cart ){
        var total = 0;
        var names = Object.keys( cart );
        for( var i = 0; i < names.length; i++ ){
            var item = names[ i ];
            total += item.price;
        }
        return total;
    }

    // 제품 이름으로 가격 설정하기
    function setPriceByName( cart , name , price ){
        if ( isInCart( cart , name ) ){
            var item = cart[ name ];
            var copy = setPrice( item , price );
            return objectSet( cart , name , copy );
        }
        else {
            var item = make_item( name , price );
            return objectSet( cart , name , item );
        }
    }

}