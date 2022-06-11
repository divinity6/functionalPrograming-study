/**
 * 프로그람 설명문서 주석
 * 2022.06. 11
 *
 *
 *           ===== 함수형 체이닝 도구 =====
 *
 *      - 함수형 개발자가 자주쓰는 체이닝 도구들은 다양하다
 *      --> map(), filter() , reduce()가 가장 단순하고 많이쓰는 도구ㅏ
 *      --> 다양한 함수형 도구는 영감을 얻는데 도움이 된다
 *
 */

title( '함수형 추가도구 소개' );
{
    /**
     * @pluck() :: 뽑다
     *  - map() 으로 특정 필드 값을 가져오기 위해 콜백을 매번 작성하는 것은 번거롭다
     *  --> pluck() 을 사용하면 매번 작성하지 않아도 된다
     */
    function pluck( array , field ){
        return map( array , function( object ){
            return object[ field ];
        } )
    }
    // 비슷한 도구
    function invokeMap( array , method ){
        return map( array , function( object ){
            return object[ method ]();
        } )
    }

    /**
     * @concat()
     *  - concat()으로 배열 안에 배열을 뺄 수 있다. 중첩된 배열을 한 단계의 배열로 맨든다
     */
    function concat( arrays ){
        var ret = [];
        forEach( arrays , function( array ){
            forEach( array , function ( element ){
                ret.push( element );
            } );
        } );
        return ret;
    }
    // 비슷한 도구 - 아 concat 으로 해당 element 를 뽑기전에 어떤 처리를 할 수 있구만...
    function concatMap( array , f ){
        return concat( map( array , f ) );
    }

    /**
     * @frequenciesBy() :: frequencies 빈도
     * @groupBy()
     *
     * - 개수를 세거나 그룹화 하는데 종종 쓸모가 있다
     * --> 이 함수는 객체, 맵을 리턴한다
     *
     * --> ( 오, 이것들은 진짜 유용한데...? )
     */
    function frequenciesBy( array , f ){
        var ret = {};
        forEach( array , function( element ){
            var key = f( element );
            if ( ret[ key ] ){
                ret[ key ] += 1;
            }
            else {
                ret[ key ] = 1;
            }
        } );
        return ret;
    }

    /**
     *  - 사용법
     *  --> 각 product 들의 타입에 값이 몇개들어있는지 나오는거네...
     */
    try{
        var howMany = frequenciesBy( products , function( product ){
            return product.type;
        } );
        console.log( howMany[ 'ties' ] );
        // :: 4
    }
    catch( e ){
        console.log( 'frequenciesBy 사용법입니다' )
    }

    function groupBy( array , f ){
        var ret = {};
        forEach( array , function( element ){
            var key = f( element );
            if ( ret[ key ] ){
                ret[ key ].push( element );
            }
            else {
                ret[ key ] = [ element ];
            }
        } )
        return ret;
    }

    /**
     *  - 사용법
     *  --> 각 그룹별로 콜백에서 설정한 값에 따라 분류해버리네
     */
    function isEven( number ) {
        return ( number / 2 === 0 );
    }

    try{

        var groups = groupBy( range( 0 , 10 ) , isEven );
        console.log( groups );
        // :: {
        //       true  : [ 0 , 2 , 4 , 6 , 8 ] ,
        //       false : [ 1 , 3 , 5 , 7 , 9 ]
        //     }
    }
    catch( e ){
        console.log( 'groupBy 사용법입니다' )
    }
}

/**
 *  - 함수형 도구는
 *  --> lodash , laravel , 클로저, 하스켈( prelude )등을 보면 많은 참고를 할 수 있다
 */