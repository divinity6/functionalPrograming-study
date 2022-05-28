/**
 * 프로그람 설명문서 주석
 * 2022.05. 23
 *
 *
 *           ===== 함수형 개발자 =====
 *
 *      - 함수형 개발자는 가능하면 액션을 쓰지 않으려고 한다
 *      --> 가능하면 계산으로 바꿀 수 있으면 그렇게 하는 것이 좋음
 *          ( 테스트하기 쉬움 )
 *
 *      - 계산은 입력 값으로 출력 값을 맨드는 것
 *      --> 호출 시점이나 횟수에 의존하지 않고
 *          동일한 값이 들어오면 항상 동일한 값을 던져줌
 *
 *      - 명확하고 재사용하기 쉽다
 *
 *      --> 계산들을 모아서 한번에 액션으로 보내버리는 구만
 *
 *      ----> 가공할 데이터를 먼저 구현하고, 계산을 구현,
 *            마지막에 액션을 구현하는 것이 함수형 프로그라밍의
 *            구현 순서
 *
 *      ----> 계산은 동시실행, 실행횟수, 과거 및 미래에 실행할 것등을
 *            고려하지 않아도 된다
 *
 *      --------------------------------------------------------
 *
 *      - 액션자체를 함수내부에서 호출하게 되면
 *      --> 그 함수 자체가 액션이된다
 *      ----> 왜냐하면 그 함수자체의 호출시점등이 중요해지기 때문
 *
 */

title('액션이 퍼져나가 함수전체가 액션으로 바뀌는 예');
{
    function sendPayout( bankCode , owed ){
        console.log( `해당 뱅크코드( ${ bankCode } ) 으로 ${ owed }을 보냅니다` )
    };

    function figurePayout( affiliate ){
        var owed = affiliate.sales * affiliate.commission;
        if ( owed > 100 ){
            sendPayout( affiliate.bank_code , owed );
        }
    };

    function affiliatePayout( affiliates ){
        for ( var a = 0; a < affiliates.length; a++ ){
            figurePayout( affiliates[ a ] );
        }
    };

    function main( affiliates ){
        affiliatePayout( affiliates );
    }


    var affiliates = [
        {
            bank_code : '하나 은행',
            sales : 100,
            commission : 10,
        },
        {
            bank_code : '신한 은행',
            sales : 50,
            commission : 5,
        },
        {
            bank_code : '농협 은행',
            sales : 10,
            commission : 2,
        },
        {
            bank_code : '리마커블 은행',
            sales : 150,
            commission : 4,
        },
    ];

    main( affiliates );
    debugger;
}
/**
 *           ===== 함수가 액션으로 변경 =====
 *
 *      - 위의 코드에서 sendPayout( ... ) 함수를
 *        내부에서 부름으로 인해 전체 코드가 액션이 되어버린다
 *        ( 함수형 사고를 적용하지 않은 코드 )
 *
 *      - 액션을 사용하는 순간, 액션을 부르는 함수는 액션이 된다
 *        그 함수를 부르는 함수또한 액션이 되고
 *        전체코드로 퍼져나가게 되는 것이다.
 *
 *      --> 따라서, 액션을 가능한 사용하지 않는 것이 좋다
 *
 *      --> 이상적인 구조는 내부에는 계산과 데이터만 존재하고
 *          맨 외부에 액션이 존재하는 구조.
 *
 *      ----> 액션은 말그대로 순수 함수( 계산 )이 아닌
 *            외부에 영향을 받거나 끼칠수있는 모든 함수 및
 *            객체를 뜻하는 걸로보엔...
 */
