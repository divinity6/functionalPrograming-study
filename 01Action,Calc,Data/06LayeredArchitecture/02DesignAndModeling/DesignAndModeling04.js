/**
 * 프로그람 설명문서 주석
 * 2022.05. 29
 *
 *
 *           ===== 줌 레벨 구체화 수준 =====
 *
 *      - 계층형 설계에서는 문제가 발생시 문제는
 *        세가지 다른 영역을 살펴보면서 찾을 수 있다
 *
 *      1. 계층 사이에 상호 관계
 *
 *      2. 특정 계층의 구현
 *
 *      3. 특정 함수의 구현
 *
 *      - 문제를 찾기 위해 알맞은 줌 레벨을 사용해 영역을 살펴볼 수 있다
 *
 */

/**
 *      1. 전역 줌 레벨( 기본 )
 *
 *      - 전역 줌 레벨로 그래프 전체 중 필요한 부분을 살펴볼 수 있다
 *
 *      2. 계층 줌 레벨
 *
 *      - 한 계층과 연결된 바로 아래 계층을 볼 수 있는 줌 레벨
 *
 *      3. 함수 줌 레벨( 계층에 있는 함수 하나 )
 *
 *      - 함수 줌 레벨로 함수 하나와 바로 아래 연결된 함수들을 볼 수 있다
 */
/**
 *
 *           ===== 구체화 다이어 그램 =====
 *
 *      - 다이어그램을 볼때 화살표가 복잡한 이유는 코드가 정돈되어 있지
 *        않아서 그렇다
 *
 *      --> 직접 구현 패턴을 사용하면 모든 화살표가 같은 길이를 가져야 한다
 *          ( 같은 구체화 수준을 가져야 함 )
 */
title( '반복문 빼내기' );
{
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

    // -----> 리팩터링

    function remove_item_by_name( cart , name ) {
        var idx = indexOfItem( cart , name );

        if ( idx !== null ){
            return removeItems( cart , idx , i );
        }
        return cart;
    }

    // 이름을 지을때도 getIdx 이런거보다 indexOfItem 이런게 더 읽기 쉽고
    // 알아보기 편하네( 엄청 구체적이니깐 )
    function indexOfItem( cart , name ){
        for ( var i = 0; i < cart.length; i++ ){
            if( cart[ i ].name === name ){
                return i;
            }
        }
        return null;
    }

    /**
     *  - 위 코드에서 indexOfItem 함수는 removeItems 함수보다 좀 더 높은 레벨의
     *    계층에 위치한다
     *  --> indexOfItem 는 cart 의 name 을 알아야 하지만,
     *      removeItems 는 cart 의 프로퍼티나 엘리먼트들을 몰라도 된다
     *
     *
     */
}
title('직접 구현 구체화수준 연습');
{
    function isInCart( cart , name ){
        return ( indexOfItem( cart , name ) !== null );
    }

    function indexOfItem( cart , name ){
        for ( var i = 0; i < cart.length; i++ ){
            if ( cart[ i ].name === name ){
                return i
            }
        }
        return null;
    }

    /**
     *           ===== 아, 무친 함수를 하나 더 빼는게 아니라 애를 부르게 해버리네 =====
     *
     *  - indexOfItem() 는 isInCart() 보다 더 낮은 수준의 함수이다
     *  --> indexOfItem() 는 인덱스를 리턴하기 때문에 사용하는 곳에서
     *      장바구니가 배열인지 알아야 한다
     *
     *  --> 반면, isInCart() 는 불리언 값을 리턴하기 때문에 사용하는 곳에서
     *      장바구니가 어떤 구조인지 몰라도 된다
     */

    // 제품 이름으로 가격 설정하기
    function setPriceByName( cart , name , price ){
        var cartCopy = cart.slice();
        var i = indexOfItem( cart , name );

        if ( i !== null ){
            cartCopy[ i ] = setPrice( cartCopy[ i ] , price );
        }

        return cartCopy;
    }

    /**
     *  - 무친, 나는 지금까지 콜백으로 처리할 생각만했지... 이렇게 재사용할 생각을
     *    자꾸 못했네...
     *  --> 기본적으로 엄청 재사용을 잘해야 하는구나..
     *
     *  --> 화살표길이를 줄이는 것에 집중하면 더 좋은 계층 구조를 맨들 수 있다
     */

    function arraySet( array , idx , value ){
        var array_copy = array.slice();
        array_copy[ idx ] = value;
        return array_copy;
    }

    // 제품 이름으로 가격 설정하기
    function setPriceByName( cart , name , price ){
        var i = indexOfItem( cart , name );
        if ( i !== null ){
            var item = cart[ i ]
            return arraySet( cart , i , setPrice( item , price ) );
        }
        return cart;
    }

    /**
     *  - 와 진짜 깔끔해졌다...
     *  --> 그치, 이렇게 하면 엄청 간결해지고, 이해하기 쉽지
     *
     *  - 이렇게 하면 구체화 계층구조에서 화살표가 더 하위단계 계층구조를 가르키지 않지만
     *    새로운 계층이 하나 더 늘어난다
     *  --> 그러나, 지금의 목표는 화살표 길이를 줄이는 것!
     *
     *  - 지금 코드의 문제점!! :
     *  --> 낮은 수준의 배열 인덱스를 참조하는 동작을 그대로 사용하고 있다!
     */
}
/**
 *      - 좋은 설계는 지속적인 탐구와 직관이 필요하다!!
 *      --> 또한, 상황에 따라 설계의 기준이 달라지기도 한다
 */