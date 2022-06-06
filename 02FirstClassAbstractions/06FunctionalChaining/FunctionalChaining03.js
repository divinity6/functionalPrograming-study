/**
 * 프로그람 설명문서 주석
 * 2022.06. 06
 *
 *
 *           ===== 함수형 체이닝 연습 =====
 *
 *      - filter() , map() 등은 새로운 배열을 맨든다
 *      --> 함수가 호출될 때마다 새로운 배열을 맨들어서 비효율적이라고
 *          생각할 수 있지만, 가비지 컬렉터( garbage-collector )가
 *          빠르게 처리하기 때문에 문제되지 않는다
 *
 *      --> 그러나, 어떠한 경우에는 비효율적인 경우도 있다
 *
 *      @스트림결합 : stream fusion
 *      --> map(), filter(), reduce() 체인을 최적화 하는 것.
 *
 *      --> 즉 , 반복문을 두번 도는 것 보다, 한번돌때, 그안에서
 *          최대한 다 처리하는게 좋다는 의미네
 *
 *      @최적화 :
 *      --> 병목현상이 발생했을 경우에 사용하는 것이 좋고,
 *          대부분의 경우에는 여러 단계를 사용하는 것이 더 명확하다
 */

title( '함수형 체이닝 연습' );
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

    title( '전체 고객 배열 중 한번만 구매한 고객들의 이메일 목록' );
    {
        var firstTimers = filter( customers , isFirstTimer );

        var fistTimerEmails = map( firstTimers , getCustomerEmail )

        function isFirstTimer( customer ){
            return customer.purchases.length === 1;
        }

        function getCustomerEmail( customer ){
            return customer.email;
        }
    }

    title( '구매 금액이 100 달러를 넘고, 두번 이상 구매한 고객' );
    {
        function bigSpenders( customers ){
            var withBigPurchases = filter( customers , hasBigPurchase );

            var twicePurchasesCustomer = filter( withBigPurchases , has20rMorePurchases );

            return twicePurchasesCustomer;
        }

        // 여기에서 예외처리를 해버리네... 0 보다 커야하니껜...
        function hasBigPurchase( customer , count = 100 ){
            return filter( customer.purchases , isBigPurchase ).length > 0;
        }

        function isBigPurchase( purchase ){
            return purchase.total > 100
        }

        function has20rMorePurchases( customer ){
            return customer.purchases.length > 2;
        }
    }

    title( '평균을 계산하는 함수' );
    {
        // 아... 이렇게 간단하게 짜는 연습을 해야하는데...
        function average( numbers ){
            return reduce( numbers , 0 , plus ) /  numbers.length;
        }

        function plus( a , b ){
            return a + b;
        }
    }

    title( '각 고객 구매액의 평균을 구하기' );
    {
        function averagePurchaseTotals( customers ){
            return map( customers , getPurchaseByCustomer );
        }

        function getPurchaseByCustomer( customer ){
            var purchaseTotals = map( customer.purchase , function( purchase ){
                return purchase.total;
            } );
            return average( purchaseTotals );
        }
    }
}
