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
 *   - 172p 까지 봣음
 */