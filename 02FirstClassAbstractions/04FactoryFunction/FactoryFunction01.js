/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 함수를 리턴하는 함수 =====
 *
 *      @SnapErrors
 *      --> 실수는 인간의 몫이고, Snap 은 신의 몫이다
 *          ( 서비스로 error 를 보낸다, error 는 코드에서
 *            작성자가 throw 하고 catch 한 것이어야 한다 )
 *
 *      - 고차함수만 사용시의 단점 :
 *      --> 모든 곳에 콜백 함수를 일일히 적어줘야한다( 실수가 발생할 수 있음 )
 *
 *      ----> 리팩터링시 모든 곳의 함수를 일일이 withLogging 콜백함수로 변경하는
 *            수고로움을 덜기위해 factory 함수를 맨들어서 거기에서 대신해줌.
 */
title( '팩토리 함수' );
{
    title( '반복되는 코드를 쓰는 기존 코드' );
    try{
        title( '수동으로 수퍼파워 주기' );
        function withLogging( f ){
            try {
                f();
            }
            catch( e ){
                logToSnapErrors( e );
            }
        }
    }
    catch( e ){
        console.log( '테스트용입니다!' );
    }

    title( '자동으로 로그를 남기는 함수를 맨들어주는 함수' );
    try{
        title( '자동으로 수퍼파워 주기' );
        function wrapLogging( f ){
            return function( arg ){
                try {
                    f( arg );
                }
                catch( e ){
                    logToSnapErrors( e );
                }
            }
        }

        var saveUserDataWithLogging = wrapLogging( saveUserDataNoLogging );
        var fetchProductWithLogging = wrapLogging( fetchProductNoLogging );
    }
    catch( e ){
        console.log( '테스트용입니다!' );
    }
}

title( '팩토리 함수 연습' );
{
    title( '예외가 발생했을 때 에러를 무시하는 함수를 맨드는 함수 맨들기' );
    try{
        function wrapIgnoreError( f ){
            return function( a1 , a2 , a3 ){
                try {
                    return f( a1 , a2 , a3 );
                }
                catch( e ){ // 에러를 무시
                    return null;
                }
            }
        }
    }
    catch( e ){
        console.log( '연습용입니다!' );
    }

    title( '다른 숫자에 어떤 숫자를 더하는 함수 맨들기' );
    {
        function makeAdder( n ){
            return function( x ){
                return n + x;
            }
        };

        var increment = makeAdder( 1 );
        increment( 10 );
    }
}

/**
 *           ===== 고차 함수 이용시 주의사항 =====
 *
 *  - 고차 함수로 프로그람을 맨들면 더 일반적으로 맨들 수 있고,
 *    고차함수를 맨드는 즐거움에 빠질 수 있다.
 *
 *  --> but, 좋은 엔지니어링은 퍼즐을 푸는 것이 아니다
 *      효과적으로 문제를 해결할 수 있어야 한다
 *
 *  --> 많은 함수형 프로그라머들이 고차함수에 몰두하기 쉽지만,
 *      직관적으로 만든 코드가 더 명확하다
 *
 *  --> 탐구하고 실험하는 것은 좋은 자세지만, 제품 코드에 실험하는 것은 안된다
 *
 *  - 항상 코드가 읽기 쉬운가를 먼저 봐야한다
 *
 *  - 코드가 하는 일을 명확히 알수있는가!!
 *
 *
 *  ==================================================================
 *          강력한 기능이지만 제일 중요한건 잘 읽히고 유지보수가 쉬운가이다!!
 *  ==================================================================
 */

/**
 *           ===== 정리 =====
 *
 *      - 고차 함수로 패턴이나 원칙을 코드로 맨들 수 있다
 *      --> 고차 함수는 한번 정의하고 필요한 곳에 여러 번 사용할 수 있다
 *
 *      - 고차 함수로 팩토리 함수를 맨들 수 있다
 *
 *      - 고차 함수를 사용하면 중복 코드를 없애주지만 가독성을 해칠 수 있다
 *
 *      --> 잘 익혀서 적절한 곳에만 사용해야 한다
 *
 *      p288
 */