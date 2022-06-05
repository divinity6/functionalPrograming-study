/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 고차 함수( higher-order function ) =====
 *
 *      - 고차 함수( higher-order function )는 인자로 함수를 받거나,
 *        리턴 값으로 함수를 리턴할 수 있는 함수
 *
 *      --> 함수 본문을 콜백으로 바꾸기( replace body with callback ) 리팩터링
 *
 *      - 익명함수( anonymous function )은 보통 인라인( inline) 함수로 정의한다
 *      --> 사용하는 곳에서 바로 정의해 그때그때 사용하기 때문
 */
title( '고차 함수' );
{
    title( '배열을 순회하는 일반적인 반복문' );
    try {
        // 준비하고 먹기
        for ( var i = 0; i < foods.length; i++ ){
            var food = foods[ i ];
            cook( food );
            eat( food );
        }

        // 설거지 하기
        for ( var i = 0; i < dishes.length; i++ ){
            var dish = dishes[ i ];
            wash( dish );
            dry( dish );
            putAway( dish );
        }
    }
    catch( e ){
        console.log( `확인하기 위해 작성한 코드입니다!` );
    }

    /**
     *  - 위의 코드에서 food 변수와 dish 변수의 하는 일은 같지만
     *    이름이 다르다.
     *
     *  --> 즉, 매우 구체적이기 때문에 나는 암묵적인자의 냄새다
     *  ----> 일반적인 이름으로 변경해야 한다
     */

    title( '콜백으로 변경한 반복문' );
    try{
        function forEach( array , f ){
            for ( var i = 0; i < array.length; i++ ){
                var item = array[ i ];
                f( item );
            }
        }

        function cookAndEat( food ){
            cook( food );
            eat( food );
        }

        function clean( dish ){
            wash( dish );
            dry( dish );
            putAway( dish );
        }

        forEach( foods , cookAndEat );
        forEach( dishes , clean );

        // 아래처럼 익명 함수로도 사용가능
        forEach( foods , function( food ){
            cook( food );
            eat( food );
        } );
        forEach( dishes , function( dish ){
            wash( dish );
            dry( dish );
            putAway( dish );
        }  );
    }
    catch( e ){
        console.log( `확인하기 위해 작성한 코드입니다!` );
    }
}
/**
 *  - 고차 함수의 장점은 코드를 추상화 할 수 있다는 것이다.
 */

/**
 *           ===== 정리 =====
 *
 *      - 일급 값은 변수에 저장할 수 있고, 인자로 전달하거나, 함수의
 *        리턴 값으로 사용할 수 있다
 *      --> 일급 값은 코드로 다룰 수 있는 값이다
 *
 *      - 언어에는 일급이 아닌 기능들이 많다
 *        ( 일급이 아닌 기능은 함수로 감싸 일급으로 맨들 수 있다 )
 *
 *      - 일급 함수는 어떤 단계 이상의 함수형 프로그라밍을 하는데 필요하다
 *
 *      - 고차 함수는 다른 함수에 인자로 넘기거나, 리턴 값으로 받을 수 있는 함수다
 *        ( 다양한 동작 추상화 가능 )
 *
 *      - 함수 이름에 있는 암묵적 인자( implicit argument in function name )은
 *        함수의 이름으로 구분하는 코드의 냄새
 *      --> 암묵적 인자를 드러내기( express implicit argument ) 리팩터링을 통해
 *          없앨 수 있다
 *
 *      - 동작을 추상화하기 위해 본문을 콜백으로 바꾸기( replace body with callback )
 *        리팩터링을 사용할 수 있다.
 *      --> 서로 다른 함수의 동작 차이를 힐급 함수 인자로 맨든다!!
 */