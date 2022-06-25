/**
 * 프로그람 설명문서 주석
 * 2022.06. 25
 *
 *
 *           ===== nestedUpdate() 도출하기 =====
 *
 *      - update4 , update5 를 맨들면서 어떤 패턴이 존재한다는 것을 파악했다
 *      --> 중첩된 개수에 상관없이 쓸 수 있는 nestedUpdate()를 맨들어 본다
 *
 *      --> 패턴은 간단하다 updateX() 를 맨들려면 update()안에 updateX-1()을 불러주면 된다
 *      ----> update()는 첫 번째 키만 사용하고 나머지 키와 modify 함수는 updateX-1()을 사용한다
 *
 *      - 재귀( recursive ) 가 핵심!!
 *      --> 같은 동작을 반복할때 어떤부분들이 반복적으로 변하고,
 *          어떤 부분을 예외로 처리할 것인가를
 *          생각하면서 맨들면 재귀함수를 좀더 쉽게 맨들 수 있다
 *
 *      --> 재귀는 무한반복에 빠질 수 있기 때문에 되도록 적은 단계를 사용하는 것이 좋다
 *
 *      --> 중첩된 데이터를 다루는 경우에는 재귀가 훨씬 명확하다
 */

title( 'nestedUpdate() 도출하기' );
{
    function update( object , key , modify ){
        var value = object[ key ];   // 값을 가지고와서
        var newValue = modify( value ); // 변경하고
        var newObject = objectSet( object , key , newValue ); // 설정한다
        return newObject;
    }

    title( '패턴 찾기' );
    {
        // update2 의 2는 키를 두개 사용하고 update1()을 호출한다는 것을 의미
        function update2( object , key1 , key2 , modify ){
            return update( object , key2 , function( value1 ){
                return update1( value1 , key2 , modify );
            } )
        }

        // update1() 은 키를 한개 사용하고
        // update0 을 호출한다
        function update1( object , key1 , modify ){
            return update( object , key1 , function( value1 ){
                return update0( value1 , modify );
            } )
        }

        // 결국 애가 변경하는 modify 를 호출하는 함수일 뿐이라는 거네
        function update0( value , modify ){
            return modify( value );
        }
    }

    /**
     *  - 위의 코드에서 update0()은 두가지 이유로 지금 패턴과 다르다
     *  --> 사용하는 키가 없어서 키가 한 개 필요한 update()를 부를 수 없다
     *  --> 또한 x-1 은 -1이 되기때문에 경로 길이를 표현할 수 없다
     *
     *  - update0 은 중첩되지 않은 객체를 의미한다는 것을 알 수 있다
     *  --> 조회나 설정을 하지않고 그냥 변경만 하는 함수
     *  --> 찾으려고 하는 값만 있으면 되기 때문에 update0() 은 modify()를
     *      그냥 호출하는 함수가 된다
     */
}


/**
 *           ===== update3()을 명시적으로 바꾸기 =====
 *
 *  - updateX() 는 인자의 갯수에대한 정보가 함수 이름에 들어가 있다
 *  --> 함수 이름에 있는 숫자가 항상 인자의 개수와 일치한다
 *      ( 함수 이름에 있는 암묵적 인자 냄새 )
 *
 *  --> 암묵적 인자 드러내기 리팩터링 사용
 */
title( 'update3() 명시적으로 변경' );
{
    title( '이전 냄시나는 코드' );
    {
        // 함수이름     : x 만큼의 키
        // key 의 갯수 : depth 개수만큼의 키
        function update3( object , key1 , key2 , key3 , modify ){
            return update( object , key1 , function( value1 ){
                // 함수 이름 : x - 1
                // key 의 갯수 : 첫 번째 키는 제외
                return update2( value1 , key2 , key3 , modify );
            } )
        }
    }

    title( '명시적으로 변경한 코드 - 재귀 함수 이용' );
    {
        /**
         *  - 동작하지 않는 함수
         */

        // 명시적 인자 : depth
        // depth 개수만큼의 키
        function updateX( object , depth , key1 , key2 , key3 , modify ){
            return update( object , key1 , function( value1 ){
                // 재귀 호출
                // depth - 1 을 전달
                // 하나맨큼 작은 키
                return updateX( value1 , depth - 1 , key2 , key3 , modify )
            } )
        }

        /**
         *  - 인자를 명시적으로 맨들었지만 새로운 문제가 생겼다
         *  --> 깊이와 키 갯수는 달라질 수 있어서 버그가 생길 것이다
         *      ( 하지만, 단서가 있다 )
         *
         *  --> 키( keys )의 갯수( number ) 와 순서( order )가 중요하다는 점
         *  ----> 이 단서를 통해 배열( [] ) 자료구조가 필요하다는 것을 알 수 있다
         *  ----> depth 인자는 배열의 길이가 된다
         */
    }

    title( '단서를 추론해 변경한 함수' )
    {
        function drop_first( array ){
            var array_copy = array.slice();
            array_copy.shift();
            return array_copy;
        }

        function updateX( object , keys , modify ){
            var key1 = keys[ 0 ];
            var restOfKeys = drop_first( keys );
            return update( object , key1 , function( value ){
                return updateX( value , restOfKeys , modify );
            } )
        }

        /**
         *  - update0 은 위와 다른 패턴이기 때문에 따로 살펴봐야 한다
         *  --> 위의 상황에서 key 의 length 가 0 이라면 어떻게 될까?
         */
    }

}

/**
 *   - 위의 패턴에서 update1(), update2(), update3() 등 같은 함수는 같은 패턴을
 *     가지고 있기 때문에 updateX()로 바꿔 쓸 수 있다. 하지만 update0()은 다르다
 *   --> 단지 콜백 함수인 modify()만 부르고 있다
 *
 *   --> 이럴 경우에는 특별하게 처리해주면 된다.
 *   ----> keys 배열의 길이가 0 일때, 키가 없기 때문에 modify() 를 부르고,
 *         그렇지 않은 경우에는 updateX()를 부르면 된다
 */
title( 'x 의 갯수가 0 일 경우에 대한 처리를 한 경우' )
{
    function updateX( object , keys , modify ){
        // key 가 0 인 경우 재귀 호출 종료
        if ( 0 === keys.length ){
            return modify( object );
        }
        // 그 외에는 재귀 호출
        var key1 = keys[ 0 ];
        var restOfKeys = drop_first( keys );
        return update( object , key1 , function( value ){
            return updateX( value , restOfKeys , modify );
        } )
    }
}

/**
 *           ===== nestedUpdate() =====
 *
 *  - 여러 단계에 중첩된 객체에 modify() 함수를 적용할 수 있다
 *  --> 이런 함수를 일반적으로 nestedUpdate() 라고 부른다
 *  --> 데이터가 중첩되지 않았다면 바로 바꾸는 동작을 한다
 *
 *  - 객체와 중첩된 객체의 값을 가리키는키 경로와 바꿀 함수를 인자로 받는다
 *  --> 그리고 빠져나오는 모든 경로의 객체에 복사본을 맨든다
 */
title( 'nestedUpdate() 함수' )
{
    function nestedUpdate( object , keys , modify ){
        if ( 0 === keys.length ){ // 종료 조건
            return modify( object );
        }
        var key1 = keys[ 0 ];
        var restOfKeys = drop_first( keys );
        return update( object , key1 , function( value ){
            return nestedUpdate( value , restOfKeys , modify ); // 자귀 호출
        } )
    }
}

/**
 *  - 함수형 개발자는 다른 개발자보다 재귀 함수를 많이 애용한다!!
 *    ( 재귀가 핵심이구나... !! )
 */