/**
 * 프로그람 설명문서 주석
 * 2022.06. 06
 *
 *
 *           ===== 함수형 체이닝으로 리팩터링 =====
 *
 *      - 기존에 있던 반복문을 함수형 도구로 리팩터링해야할떼
 *
 *      @이해하고다시만들기
 *      --> 단순히 반복문을 읽고 어떤 일을 하는지 파악 후 구현을 잊어버리고 다시 맨드는 것
 *
 *      @단서를찾아리팩터링
 *      --> 기존 코드를 잘 이해할 수도 있지만 이해하기 힘든 경우,
 *          반복문을 하나씩 선택한 후 함수형 도구 체인으로 바꾸면 된다
 *
 *
 *      - 아... 일단 리팩터링 하려면, 해당기능이 어떻게 동작하는지 대략적으로 파악해야겠네...
 *
 *      @리팩터링팁
 *      1. 데이터 맨들기
 *      2. 배열 전체를 다루기
 *      3. 작은 단계로 나누기
 */

title( '기존의 더러운 코드' );
{

    try {
        var answer = []; // answer 는 반복문 안에서 결과가 완성되는 배열
        var window2 = 5;

        for ( var i = 0; i < array.length; i++ ){ // 바깥쪽 배열은 배열 갯수만큼 반복
            var sum = 0;
            var count = 0;

            for ( var w = 0; w < window2; w++ ){ // 안쪽 배열은 0~4 까지 작은 구간 반복
                var idx = i + w;    // 새로운 인덱스를 계산한다
                if ( idx < array.length ){
                    sum += array[ idx ];
                    count += 1;     // 어떤 값을 누적한다
                }
            }
            answer.push( sum / count ); // answer 배열에 값을 추가한다
        }

    }
    catch( e ){
        console.log( '기존의 더러운 코드 연습용입니다' );
    }

    /**
     *  - 코드를 전부 이해하지 않아도 작게 쪼갤 수 있다.
     *    ( 단서가 많이 있다 )
     *
     *  1. 바깥쪽 배열 : answer 에 원래 배열의 크기만큼 추가( map 사용 가능 )
     *
     *  2. 안쪽 배열 : 각 항목을 하나의 값으로 맨들고 있음( reduce 사용 가능 )
     *  --> 안쪽 배열이 리팩터링을 시작하기 좋은 위치
     */
}



/**
 *           ===== 데이터 맨들기 =====
 *
 *      - 데이터를 배열에 넣으면 함수형 도구를 사용할 수 있다
 *
 *      - 위 코드에서
 *
 *      --> w : 0부터 window2 - 1 까지 바뀌지만
 *              배열에 들어있는 값은 아니다
 *
 *      --> idx : i 부터 i + window2 - 1 까지 바뀌지만
 *                배열로 맨들지 않는다
 *
 *      -->  array[ idx ] : 배열에 있는 작은 범위의 값이지만 배열로
 *                          따로 맨들지 않았다
 *
 *
 *      - 안쪽 반복문은 array 에 있는 어떤 값들 중 어떤 범위의 값을 반복한다
 *      --> 만약, 이 범위의 값을 배열로 맨들어 반복하면 어떻게 될까?
 */
title( 'slice() 메서드 이용' );
{
    try {
        var answer = [];
        var window2 = 5;

        for ( var i = 0; i < array.length; i++ ){
            var sum = 0;
            var count = 0;

            // 아... array.length 까지밖에 반복을 안하니깐 거기까지 slice 로 짤라낸거구나
            var subarray = array.slice( i , i + window2 ); // 하위 배열로 맨든다

            for ( var w = 0; w < subarray.length; w++ ){ // 그리고 반복문으로 배열을 반복한다
                sum += subarray[ w ];
                count += 1;
            }
            answer.push( sum / count ); // answer 배열에 값을 추가한다
        }

    }
    catch( e ){
        console.log( '기존의 더러운 코드 연습용입니다' );
    }

    /**
     *      - 아... 어짜피 idx 는 array.length 보다 작을때만
     *        동작하고, w 는 무조건 5번 도니깐,
     *
     *      --> w 와 idx , 인덱스를 맨드는 부분을 하나로 합쳐버린거네
     *          ( w 는 i 값에 따라 계속 증가하기 때문에 i 부터 slice 하면 끝이지... )
     *
     *      --> 그리고 array 에서 직접 찾아 계산을 하는게 아니라,
     *          새로운 배열에 담은부분에서 찾아서 계산하는구나
     *      ----> 그치, 새로운 배열에 얕은복사를 한 후 넣어두면 거기서 찾으면 끝나는 거니깐...
     *            굳이 실제 데이터에서 찾으려고 안해도 되는거지
     *      ----> 그러면 전체를 반복하는게 아니라, 해당 배열만 반복하면 되는거고...
     */
}

/**
 *           ===== 한 번에 전체 배열을 조작하기 =====
 *
 *      - 하위 배열을 맨들었기 때문에 일부 배열이 아닌 배열 전체를 반복할 수 있다
 *      --> 그전에는 배열 전체를 반복하다가, 해당 부분 이후는 버려지지만,
 *          이러면 가독성이 매우 좋지 않으니 차라리 얕은 복사를 해서 배열전체를
 *          도는 것이 가독성 측면에서 매우 효율적이라는 이야기.
 */

title( 'average() 함수 이용' );

title( '전역 기본 함수' );
function reduce( array , init, f ){
    var accum = init;
    array.forEach( item => {
        accum = f( accum , item );
    } );
    return accum;
}

function average( numbers ){
    return reduce( numbers , 0 , plus ) /  numbers.length;
}

function plus( a , b ){
    return a + b;
}

function map( array , f ){
    return reduce( array , [] , function( newArr , item  ){
        newArr.push( f( item ) );
        return newArr;
    } );
}
{

    try {
        var answer = [];
        var window2 = 5;

        // 본문에서 배열에 있는 항목을 사용하지 않고 인덱스만 사용한다
        for ( var i = 0; i < array.length; i++ ){
            var subarray = array.slice( i , i + window2 ); // 안쪽 반복문 전체를 .slice()
            answer.push( average( subarray ) );            // 와 average() 를 호출하는
                                                           // 코드로 바꾸었다
        }

        // 그치 다 더하고, 반복문마다 초기화하고, 마지막에 나누니깐 average 가능하기

    }
    catch( e ){
        console.log( '기존의 더러운 코드 연습용입니다' );
    }

    /**
     *      - 와, 이렇게 리팩터링 하려면 기존에 하던 함수가 대충 어떻게 동작하는지 대충
     *        이해하고 있어야겠는데...? 함수를 보는 눈을 길러야겠네
     *      --> 눈이 안뜨이면 진짜 안보임...
     */
}

/**
 *           ===== 작은 단계로 나누기 =====
 *
 *      - 위의 코드를 리팩터링 하다보니, 배열 항목 전체를 반복하면서,
 *        같은 크기의 새로운 배열( subarray )을 맨들고 있다
 *
 *      --> 위의 코드의 문제점은 배열의 각 항목이 아니라, 인덱스( i )를
 *          가지고 반복해야 한다는 문제가 있다.
 *      --> 따라서, 인덱스를 가지고 원래 배열의 하위 배열, 또는 windows 배열을 맨든다
 *          ( 아. 즉, 인덱스만 가지고 있는 배열을 맨드는거네... )
 *
 *      --> 더 작은 단계로 나누어야 한다
 */
title( '더 작은 단계로 나누기' );
{
    try {
        var indices = [];

        for ( var i = 0; i < array.length; i++ ) { // 인덱스만을 가지고 있는 배열을 맨드네
            indices.push( i );
        }
        // 한번 더 반복하더라도 이해하기 쉬운 코드가 더 좋쿠나!!

        var window2 = 5;

        // 인덱스 배열에 map()을 사용한다
        var answer = map( indices , function( i ){
            var subarray = array.slice( i , i + window2 );
            return average( subarray );  // 하위 배열을 맨드는 일 + 평균을 계산하는 일
                                         // 두 가지를 하고 있다
        } );

    }
    catch( e ){
        console.log( '코드 연습용입니다' );
    }
    /**
     *  - 그치, 보고나니깐, 저수준의 반복문은 사용할 필요가 없네
     *  --> 무적권 함수형 반복을 사용하는게 맞네...
     *
     *  --> 그럼 어떤일들을 하고있는지 명시적으로 보이니깐...
     *
     *  - 현재는 map() 콜백 안에서 두 가지 일을 하고있다.
     *
     *  1. 하위 배열 맨들기
     *
     *  2. 평균을 계산하기
     *
     *  - 이코드들은 두 단계로 나누면 더 명확해 질 것이다
     */

}
title( '더 작은 단계로 나누기2' );
{


    try {
        // 재사용 가능한 추가 도구
        function range( start , end ){
            var ret = [];
            for ( var i = start; i < end; i++ ){
                ret.push( i );
            }
            return ret;
        }
        var window2 = 5;

        // 몇번 더 반복하더라도 이해하기 쉬운 코드가 더 좋쿠나!!
        var indices = range( 0 , array.length );

        var windows2 = map( indices , function( i ){    // 하위 배열맨들기
           return array.slice( i , i + window2 );
        } );

        var answer = map( windows2 , average ); // 평균 계산하기

        // 이렇게 반복문이 중첩되더라도 알아보기 쉬운게 더 좋아보이네...

    }
    catch( e ){
        console.log( '코드 연습용입니다' );
    }

    /**
     *      - 모든 반복문을 함수형 도구들로 체이닝했다
     *        ( 훨씬 알아보기 간결하네... )
     *
     *      - 코드에 있는 각 단계는 알고리즘을 설명하는 것과 비슷하다
     *
     *      - 생각해 볼 것
     *
     *      1. 재사용하기 쉬운가
     *
     *      2. 테스트하기 쉬운가
     *
     *      3. 유지보수하기 쉬운가
     */
}
