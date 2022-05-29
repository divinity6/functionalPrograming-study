/**
 * 프로그람 설명문서 주석
 * 2022.05. 28
 *
 *
 *           ===== 직접 구현 =====
 *
 *      - 계층 구조는 아무리 강력한 기능을 하는 함수가 있더라도
 *        복잡하지 않게 함수를 표현해야 한다
 *
 */

title( '넥타이 하나를 사면 무료로 넥타이 클립을 주는 코드' );
{
    function make_item( tieClip , count) {
        return { name : tieClip, count }
    }


    function add_item( cart , tieClip ){
        return cart.push( tieClip );
    }

    function freeTieClip( cart ){
        var hasTie = false;
        var hasTieClip = false;
        for ( var i = 0; i < cart.length; i++ ){
            var item = cart[ i ];
            if ( item.name === 'tie' ){
                hasTie = true;
            }
            if ( item.name === 'tie clip' ){
                hasTieClip = true;
            }
        }

        if ( hasTie && !( hasTieClip ) ){
            var tieClip = make_item( "tie clip" , 0 );
            return add_item( cart , tieClip );
        }
        return cart;
    }

    /**
     *  - 이렇게 바로 코드를 추가하면 유지보수하기가 어렵다
     *
     *  - 이 코드는 계층형 설계패턴인 직접 구현을 따르고 있지 않다
     *  --> freeTieClip() 함수가 알아야할 필요가 없는
     *      구체적인 내용을 담고 있다
     *      ( 예 ) 장바구니가 배열이라는 사실을 알아야 하는가? )
     *
     */
}
/**
 *           ===== 장바구니가 해야할 동작 =====
 *
 *     - 현재 구현이 되어있는 동작은 체크표시
 *
 *      1. 제품 추가하기( o )
 *
 *      2. 제품 삭제하기( o )
 *
 *      3. 장바구니에 제품이 있는지 확인하기
 *
 *      4. 합계 계산하기( o )
 *
 *      5. 장바구니 비우기
 *
 *      6. 제품 이름으로 가격 설정하기( o )
 *
 *      7. 세금 계산하기( o )
 *
 *      8. 무료 배송이 되는지 확인하기( o )
 */
title( '장바구니 구현' )
{
    // 제품 추가하기
    function add_item( cart , item ){
        return add_element_last( cart , item );
    }

    // 제품 삭제하기
    function remove_item_by_name( cart , name ) {
        var idx = null;
        for ( var i = 0; i < cart.length; i++ ){
            if( cart[ i ].name === name ){
                idx = i;
            }
        }

        if ( idx !== null ){
            return removeItems( cart , idx , i );
        }
        return cart;
    }

    // 합계 계산하기
    function calc_total( cart ){
        var total = 0;
        for( var i = 0; i < cart.length; i++ ){
            var item = cart[ i ];
            total += item.price;
        }
        return total;
    }

    // 제품 이름으로 가격 설정하기
    function setPriceByName( cart , name , price ){
        var cartCopy = cart.slice();
        for ( var i = 0; i < cartCopy.length; i++ ){
            if( cartCopy[ i ].name === name ){
                cartCopy[ i ] = setPrice( cartCopy[ i ] , price );
            }
        }
        return cartCopy;
    }

    // 세금 계산하기
    function cartTax( cart ){
        return calc_tax( calc_total( cart ) );
    }

    // 무료 배송이 되는지 확인하기
    function gets_free_shipping( cart ){
        return calc_total( cart ) >= 20;
    }

}