/**
 * 프로그람 설명문서 주석
 * 2022.06. 06
 *
 *
 *           ===== 단계에 이름 붙이기 =====
 *
 *      - 체인을 명확하게 맨드는 첫 방법은 각 단계에 이름을 붙이는 것이다
 */

title( '체인을 명확하게 맨들기 : 단계에 이름붙이기' );
{
    function biggestPurchasesBestCustomers( customers ){
        // 1 단계
        var bestCustomers = selectBestCustomers( customers );
        // 2 단계
        var biggestPurchases = getBiggestPurchases( bestCustomers );
        return biggestPurchases;
    };

    function selectBestCustomers( customers ){
        return filter( customers , function ( customer ){
            return customer.purchases.length > 3;
        } );
    }

    function getBiggestPurchases( bestCustomers ){
        return map( bestCustomers , getBiggestPurchase );
    }

    function getBiggestPurchase( customer ){
        return maxKey( customer.purchases , { total : 0 } , function( purchase ){
            return purchase.total;
        } )
    }
    // 고차 함수를 빼내 각각 문맥에 맞게 변경
}

/**
 *           ===== 콜백에 이름 붙이기 =====
 *
 *      - 체인을 명확하게 맨드는 두 번째 방법은 콜백에 이름을 붙이는 방법이다
 */
title( '체인을 명확하게 맨들기 : 콜백에 이름붙이기' );
{
    function biggestPurchasesBestCustomers( customers ){
        // 1 단계
        var bestCustomers = filter( customers , isGoodCustomer );
        // 2 단계
        var biggestPurchases = map( bestCustomers , getBiggestPurchase );
        return biggestPurchases;
    }

    function isGoodCustomer( customer ){
        return customer.purchases.length > 3;
    }

    function getBiggestPurchase( customer ){
        return maxKey( customer.purchases , { total : 0 } , getPurchaseTotal( purchase ) );
    }

    function getPurchaseTotal( purchase ){
        return purchase.total;
    }

    /**
     *  - 콜백을 빼내고, 이름을 붙여 재사용할 수 있는 함수로 맨들었다
     *  --> 호출그래프 아래쪽에 위치하므로 재사용하기 좋은 코드다
     *  ----> selectBestCustomers 는 고객전체를 받아쓰지만,
     *        isGoodCustomer 는 고객하나를 받아 비교하므로 재사용하기 훨씬 좋다
     */
}
/**
 *           ===== 두 방법을 비교 =====
 *
 *      - 일반적으로 두 번째 방법이 더 명확하다. 고차 함수를 그대로 쓰는 것보다
 *        이름을 붙인 두 번째 방법이 재사용하기도 더 좋다
 *
 *      --> 인라인 대신, 이름을 붙여 콜백을 사용하면 단계가 중첩되는 것도 막을 수 있다
 *
 *      - but, 이런 것들도 언어와 문맥에 따라 달라진다!
 *        두 방법을 모두 시도해서 어떤 방법이 더 좋은지 코드를 비교해 결정해야 한다
 */