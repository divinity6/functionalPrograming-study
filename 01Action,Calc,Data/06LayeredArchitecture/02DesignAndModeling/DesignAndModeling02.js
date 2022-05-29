/**
 * 프로그람 설명문서 주석
 * 2022.05. 29
 *
 *
 *           ===== 직접 구현 =====
 *
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
 *
 *      - 만약 장바구니에 제품이 있는지 확인하는 함수가 있다면,
 *        freeTieClip() 함수에서 직접 반복문을 돌면서 tie 를 체크하지 않아도 될것이다
 *
 *      --------------------------------------------------------------------
 *                               호출 그래프
 *
 *                               freeTieClip()
 *                            /       |       \
 *                           /        |        \
 *                          /         |         \
 *                    isInCart()  make_item()   add_item()
 *      --------------------------------------------------------------------
 */

title( '장바구니에 제품이 있는지 체크하는 코드가 있으면 freeTieClip 코드가 깔끔해진다' );
{
    function make_item( name , price) {
        return { name , price }
    }


    function add_item( cart , tieClip ){
        return cart.push( tieClip );
    }

    // 비슷한 구체화 수준에서 작동하고 있다
    function freeTieClip( cart ){
        var hasTie = isInCart( cart , 'tie' );
        var hasTieClip = isInCart( cart , 'tie clip' );

        if ( hasTie && !( hasTieClip ) ){
            var tieClip = make_item( "tie clip" , 0 );
            return add_item( cart , tieClip );
        }
        return cart;
    }

    function isInCart( cart , name ){
        for( var i = 0; i < cart.length; i++ ){
            if( cart[ i ].name === name ){
                return true
            }
        }
        return false
    }
}
/**
 *      - 언어에서 제공하는 for 루프문이나, 배열 인덱스 기능등은
 *        최하위 추상화 수준이다
 *
 *      - 직접맨든 make_item , add_item 등은 그보다는 높은 추상화 수준이다
 *
 *      ----> 한 함수에서 서로 다른 추상화 단계를 사용하면 코드가 명확하지 않아 읽기가 어렵다!!!
 *
 *
 *      ==========================================================================
 *              따라서 , 서로 다른 추상화 단계에 있는 기능을 사용하면 직접 구현 패턴이 아니다
 *      ==========================================================================
 *
 *      - 마지막으로 고민할것 : 과연 freeTieClip 함수가 장바구니가 배열로 되어있는지를 알아야 할까...?
 */