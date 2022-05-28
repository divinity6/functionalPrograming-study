/**
 * 프로그람 설명문서 주석
 * 2022.05. 28
 *
 *
 *           ===== 카피-온-라이트( copy-on-write ) =====
 *
 *      -
 */


title( '카피-온-라이트( copy-on-write )' );
{
    var shopping_cart = [];

    function remove_item_by_name( cart , name ){
        var new_cart = cart.slice();
        var idx = null;
        for( var i = 0; i < new_cart.length; i++ ){
            if( new_cart[ i ].name === name ){
                idx = i;
            }
        };
        if ( idx !== null ){
            new_cart.splice( idx , 1 );
        }
        return new_cart;
    }

    function delete_handler( name ){
        shopping_cart = remove_item_by_name( shopping_cart , name );
        var total = calc_total( shopping_cart );
        set_cart_total_dom( total );
        update_shipping_icons( shopping_cart );
        update_tax_dom( total );
    }
}
title( 'splice() 메서드 일반화 하기' );
{
    function removeItems( array ,idx , count ){
        array.splice( idx , count )
    }
    // 카피-온-라이트 적용
    function removeItems( array ,idx , count ){
        var copy = array.splice();
        copy.splice( idx , count )
        return copy;
    }

    function remove_item_by_name( cart , name ){
        var idx = null;
        for( var i = 0; i < cart.length; i++ ){
            if( cart[ i ].name === name ){
                idx = i;
            }
        };
        if ( idx !== null ){
            return removeItems( cart , idx , 1 );
        }
        return cart;
    }
}
/**
 *      - 처음 시작할때 deepCopy 를 하는것이 아니라 변경할때 메서드로 뺀다음에
 *        리턴시켜버리는 방법이 있네
 *        ( 복사하는 코드를 반복해서 사용하지 않아도 되기 때문 )
 */

/**
 *           ===== JS 에서 배열은 컬렉션이다( collection ) =====
 *
 *      - 순서있는 값을 나타냄
 *        ( index 로 접근할 수 있다 - 크기를 늘리거나 줄일 수 있음 )
 */