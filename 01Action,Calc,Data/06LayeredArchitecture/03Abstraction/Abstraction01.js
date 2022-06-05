/**
 * 프로그람 설명문서 주석
 * 2022.05. 29
 *
 *
 *           ===== 추상화의 벽( abstraction barrier ) =====
 *
 *      - 추상화의 벽은 세부 구현을 감춘 함수로 이루어진 계층
 *        ( 구현을 전혀 몰라도 됨 )
 *      --> 추상화 벽에 있는 함수를 사용할때 세부 코드에 신경쓰지 않아도 된다
 *
 *      --> 추상화의 벽에 있는 코드들이 데이터 구조를 알고있어야 한다!
 *
 *      ----> 데이터 구조를 알고 있는 계층을 따로 맨들어 두는 건가...?
 *
 *      - 추상화의 벽은 :: 어떤 것을 신경쓰지 않아도 되지?
 *      --> 라는 말을 거창하게 표현한 개념이다
 *
 *      --> 계층구조에서 어떤 계층에 있는 함수들이 공통된 개념을 신경쓰지 않아도 된다면
 *          그 계층을 추상화의 벽이라고 할 수 있다
 *
 *      ----> 아, 추상화의 벽에 있는 함수들이 알아야 되는 것들을 다 처리해주니깐...
 *            그 벽에 있는 함수들만 고쳐쓰면 되는거구나!!
 *
 *      - 중요한 규칙!!
 *
 *      --> 추상화의 벽을 가로지르면 안된다!!
 *
 *      ----> 추상화의 벽을 가로지르게 되면, 규칙을 어기게 되는 것이다!
 *            ( 신경쓰지 않아야 할 세부적인 구현을 사용하고 있는 것이다 )
 *
 *      ----> 이럴 때는, 추상화의 벽에 새로운 함수를 맨들어 줘야 한다!!
 *
 *      ----> 추상화의 벽위에 있는 고순준의 추상화 코드들은 추상화의 벽과 그 위에 있는
 *            코드들만 호출하게 하면 된다!!
 *
 */

title( '장바구니를 객체로 다시 만들기' );
{

    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }

    function objectDelete( object , key ){
        var _object = Object.assign( {} , object );
        delete _object[ key ];
        return _object;
    }

    function isInCart( cart , name ){
        return cart.hasOwnProperty( name );
    }

    // 제품 추가하기
    function add_item( cart , item ){
        return objectSet( cart , item.name , item );
    }

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

    // 제품 삭제하기
    function remove_item_by_name( cart , name ) {
        return objectDelete( cart , name );
    }

}
/**
 *      - 잘못 선택한 데이터 구조가 어려운 코드를 만든다
 *      --> 고친 코드가 더 작고 효율적이다.
 */