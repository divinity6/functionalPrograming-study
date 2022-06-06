/**
 * 프로그람 설명문서 주석
 * 2022.06. 06
 *
 *
 *           ===== 함수형 도구 체이닝 =====
 *
 *      @체이닝 : chaining
 *      --> 여러 단계들을 하나로 조합하는 것
 *
 *      @항등함수 : identity function
 *      --> 인자로 받은 값을 그대로 리턴하는 함수
 *
 */

title( '함수형 체이닝' );
{
    title( '전역 기본 함수' );
    function reduce( array , init, f ){
        var accum = init;
        array.forEach( item => {
            accum = f( accum , item );
        } );
        return accum;
    }

    function map( array , f ){
        return reduce( array , [] , function( newArr , item  ){
            newArr.push( item );
            return newArr;
        } );
    }

    function filter( array , f ){
        return reduce( array , [] , function( newArr , item ){
            if ( f( item ) ){
                newArr.push( item );
            }
            return newArr;
        } );
    }

    title( '우수 고객들의 가장 비싼 구매' );
    title( '함수형 반복 : 이해하기 어려운 코드' );
    {
        function biggestPurchasesBestCustomers( customers ){
            var bestCustomers = filter( customers , function ( customer ){
                return customer.purchases.length > 3;
            } );

            var biggestPurchases = map( bestCustomers , function( customer ){
                return maxKey( customer.purchases , { total : 0 } , function( purchase ){
                    return purchase.total;
                } )
            } );

            return biggestPurchases;
        }

        // 중첩된 콜백은 읽기 어렵기 때문에 maxKey 로 콜백을 뺏음... - 좀 더 구체적인 선택
        function maxKey( array , init , f ){
            return reduce( array , init , function( biggestSoFar , element ) {
                if ( f( biggestSoFar ) < f( element ) ) {
                    return element;
                }
                return biggestSoFar;
            } )
        }
    }
    /**
     *  - 잘 동작하는 코드이지만, 콜백이 여러개 중복되어 함수가 너무 커졌다.
     *  --> 코드가 깨끗하지 않고 이해하기 어렵다
     */

    title( 'maxKey 로 max 맨들기 : maxKey 가 더 일반적인 함수' );
    {
        function max( array ){
            return maxKey( array , Number.MIN_VALUE , function( x ) {
                return x;
            } )
        }
    }

}
