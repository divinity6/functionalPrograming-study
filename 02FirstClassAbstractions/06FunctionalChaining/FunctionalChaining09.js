/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== 체이닝을 데이터로 맨들기 연습 =====
 *
 *      -
 *
 */

title( '체이닝을 데이터로 맨들기 연습' );
{
    title( '함수형 도구' )
    function reduce( array , init, f ){
        var accum = init;
        array.forEach( item => {
            accum = f( accum , item );
        } );
        return accum;
    }

    function withObjectCopy( object , modify  ){
        var copy = Object.assign( {} , object );
        modify( copy );
        return copy;
    }

    function objectSet( object , key , value ){
        return withObjectCopy( object , function( copy ){
            copy[ key ] = value
        } );
    }

    title( '명단 맨들기' );
    {
        var evaluations = [
            { name : "Jane" , position : "catcher" , score : 25 },
            { name : "John" , position : "pitcher" , score : 10 },
            { name : "Harry" , position : "pitcher" , score : 3 },
        ]

        // 아, 미친 그대로 덮어쓰게되지...ㅋㅋㅋ 그냥할당하면
        var rosters = reduce( evaluations , {} , function( roster , eval ){
            var position = eval.position;

            if ( roster[ position ] ){
                return roster;
            }
            else {
                objectSet( roster , position , eval.name );
            }
        } )
    }
    title( 'recommendPosition 메서드를 이용해 직원 이름 리스트를 추천 리스트로 바꾸는 코드' )
    try{
        var employeeNames = [ 'John' , 'Harry' , 'Jane' ];

        var recommendations = map( employeeNames , function( name ){
            return {
                name : name ,
                position : recommendPosition( name ),
            }
        } )
    }
    catch( e ){
        console.log( '연습용 문제입니다' )
    }

    title( 'scorePlayer 함수는 직원 이름과 포지션을 넘기면 숫자로된 점수를 리턴함. 평점 목록으로 변경하기' );
    try {
        var recommendations = [
            { name : 'Jane' , position : 'catcher' },
            { name : 'John' , position : 'pitcher' },
        ]

        var evaluations = map( recommendations , function( rec ){
            return objectSet( rec , 'score' , scorePlayer( rec.name , rec.position ) );
        } )
    }
    catch( e ){
        console.log( '연습용 문제입니다' )
    }

    /**
     *  - 진짜 미친 단순하게 한줄로 끝내버리네.... 단순하게 하는 방법을 자꾸 연습해야해...
     */

    title( '높은 점수순으로 정렬된 평점 목록과 낮은 점수순으로 정렬된 평점 목록 맨들기' );
    try {
        var employeeNames = [ 'John' , 'Harry' , 'Jane' ];

        var recommendations = map( employeeNames , function( name ){
            return {
                name : name,
                position : recommendPosition( name ),
            }
        } );

        var evaluations = map( recommendations , function( rec ){
            return objectSet( rec , 'score' , scorePlayer( rec.name , rec.position ) );
        } );

        var evaluationsAscending = sortBy( evaluations , function( eval ){
            return eval.score;
        } );

        var evaluationsDescending = reverse( evaluationsAscending );

        var roster = reduce( evaluations , {} , function( roster , eval ){
            var position = eval.position;
            if ( roster[ position ] ){
                return roster;
            }
            else {
                return objectSet( roster , position , eval.name );
            }
        } )

    }
    catch( e ){
        console.log( '연습용 문제입니다' );
    }

    /**
     *  - 이렇게 중간중간 단계를 끊어두면
     *    끊어서 활용하기가 매우 편리하겠다
     *  --> 체이닝으로 중간중간 활용하기가 매우 편리할듯
     */
}

/**
 *           ===== 정리 =====
 *
 *      - 체인의 각 단계는 원하는 결과에 가까워지도록 데이터를 변화시키는 동작이다
 *        ( 각 단계별로 끊어서 사용 가능 )
 *
 *      - reduce 는 어디에서나 쓰이는 강력한 도구이다
 *
 *      1. 함수형 도구는 여러 단계의 체인으로 조합할 수 있다
 *      --> 함수형 도구를 체인으로 조합하면 복잡한 계산을 작고 명확한 단계로 표현할 수 있다
 *
 *      2. 함수형 도구를 체인으로 조합하는 것은 SQL 같은 쿼리 언어로 볼 수 있다
 *      --> 함수형 도구 체인으로 배열을 다루는 복잡한 쿼리를 표현할 수 있다
 *
 *      3. 종종 체인의 다음 단계를 위해 새로운 데이터를 맨들거나, 기존 데이터를 인자로
 *         사용해야 하는 일이 있다
 *      --> 최대한 암묵적인 정보를 명시적으로 표현하는 방법을 찾아야 한다
 *
 *      4. 함수형 도구는 많다
 *      --> 리팩터링을 하며 새로운 함수형 도구를 찾거나, 다른 언어에서 영감을 받을 수 있다
 *
 *      5. 자바같은 전통적으로 함수형 언어가 아닌 언어들도 함수형 도구를 지원하고 있다
 *
 */