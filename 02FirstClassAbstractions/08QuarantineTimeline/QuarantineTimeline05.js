/**
 * 프로그람 설명문서 주석
 * 2022.07. 03
 *
 *
 *           ===== 재사용하기 더 좋은 코드로 맨들기 =====
 *
 *      - DOM 을 업데이트 하는 것과, total 값을 분리
 */
title( '함수 본문을 콜백으로 바꾸기' );
{
    try {
        function add_item_to_cart( name , price , quantity ){
            cart = add_item( cart , name , price , quantity );
            calc_cart_total( cart ,   );
        }

        function calc_cart_total( cart , callback ){
            var total = 0;
            cost_ajax( cart , function( cost ){
                total += cost;
                shipping_ajax( cart , function( shipping ){
                    total += shipping;
                    callback( total ); // 콜백으로 변경
                } )
            } )
        }
    }
    catch( e ){
        console.log( '장바구니 추가 콜백으로 변경' );
        debugger;
    }
}
/**
 *           ===== 비동기 호출에서 명시적인 출력을 위해 리턴 값 대신 콜백을 사용할 수 있다 =====
 *
 *      - 비동기 호출에서 결괏값을 리턴값으로 줄 수 없다
 *
 *      --> 비동기 호출은 바로 리턴이 되지만, 결괏값은 콜백이 호출되어야 얻을 수
 *          있기 때문,
 *
 *      --> 동기화된 함수처럼 일반적인 방법으로 결과를 받을 수 없다
 *
 *      - 비동기 호출에서 결과를 받을 수 있는 방법은 콜백을 사용하는 것
 *
 *      --> 결과가 준비되었을 때, 결과를 인자에 넣어 콜백을 호출한다
 *          ( 가장 일반적인 JS 에서 비동기 프로그라밍 방법 )
 *
 *      - 함수형 프로그라밍에선 콜백읉 비동기 함수에서 액션을 빼낼때 사용할 수 있다
 *
 */
title( '연습문제' );
{
    title( '설거지를 수행하는 코드, 암묵적 입출력 제거 리팩터링' );
    try{
        function doDishes( plates , forks , cups , callback ){
            var total = 0;

            wash_ajax( plates , function(){
                total += plates.length;

                wash_ajax( forks , function(){
                    total += forks.length;

                    wash_ajax( cups , function(){
                        total += cups.length;
                        callback( total );
                    } )
                } )
            } )
        }

        doDishes( plates , forks , cups , update_dishes_dom );
    }
    catch( e ){
        console.log( "암묵적 입,출력 제거 리팩터링" );
    }
}

/**
 *           ===== 정리 =====
 *
 *      - 타임라인은 동시에 실행될 수 있는 순차적 액션을 뜻한다.
 *      --> 코드가 순서대로 실행되는지, 동시에 실행되는지 알 수 있다
 *
 *      - 현대 소프트웨어는 여러 타임라인에서 실행된다
 *      --> 서로다른 컴퓨터, 스레드, 프로세스, 비동기 호출같은 것이 있다면
 *          새로운 타임라인을 추가한다
 *
 *      - 서로 다른 타임라인에 있는 액션은 끼어들 수 있어서 여러 개의 실행 가능한
 *        순서가 생긴다
 *      --> 실행 가능한 순서가 많으면 코드가 항상 올바른 결과를 내는지
 *          알기 어렵다
 *
 *      - 타임라인 다이어그램은 코드가 순서대로 실행되는지, 동시에 실행되는지를
 *        알려준다
 *      --> 타임라인 다이어그램으로 서로 영항을 주는 부분이 어떤 부분인지
 *          알 수 있다
 *
 *      - 언어에서 지원하는 스레드 모델을 이해하는 것은 중요하다
 *      --> 분산 시스템에서 어떤 부분이 순서대로 실행되고, 어떤 부분인 동시에
 *          실행되는지 이해하는 것이 중요하다
 *
 *      - 자원을 공유하는 부분은 버그가 발생하기 쉽다
 *      --> 공유 자원을 확인하고 없애면 코드가 더 좋아진다
 *
 *      - 자원을 공유하지 않는 타임라인은 독립적으로 이해하고 실행할 수 있다
 *      --> 함께 생각해야할 내용이 줄어든다
 */