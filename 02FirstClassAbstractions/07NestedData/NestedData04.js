/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== updateOption() 도출하기 =====
 *
 *      - update() 안에서 update()를 호출하는 코드를
 *        일반화해서 updateOption()을 맨들 수 있다
 *
 *      - update()를 두번 부르고 데이터도 두 단계( 객체 두 개를 거침 )
 *        로 중첩된 것을 볼 수 있다
 *
 *      --> 여기서 데이터가 중첩된 단계만큼 update()를 호출해야 한다는 것을 알 수 있다
 *
 *      - incrementSize 함수는 코드에서 나는 암묵적 인자 때문에 냄새가 난다
 */

title( 'updateOption() 도출하기' );
{
    var shirt = {
        name : "shirt",
        price : 13,
        options : {
            color : "blue",
            size : 3
        }
    }

    function update( object , key , modify ){
        var value = object[ key ];   // 값을 가지고와서
        var newValue = modify( value ); // 변경하고
        var newObject = objectSet( object , key , newValue ); // 설정한다
        return newObject;
    }

    title( '암묵적 인자에서 나는 냄시' );
    {
        // 함수 이름에 들어있는 increment 동작 냄시
        function incrementSize( item ){
            return update( item , "options" , function( options ){
                // 함수 이름에 있는 암묵적 인자들
                return update( options , "size" , increment );
            } );
        }
    }

    title( '명시적 option 인자' );
    {
        // 필드명을 구체적이아닌 일반적인 이름으로 변경
        function incrementOption( item , option ){
            return update( item , "options" , function( options ){
                return update( options , option , increment );
            } );
        }
    }

    title( '명시적 modify 인자' );
    {
        // 동작을 일반적인 이름으로 변경
        function updateOption( item , option , modify ){
            // 그러나 여전히 코드의 냄새가 "options" 에서 난다
            // 함수 이름에 있는 것을 본문에서 참조하고 있다
            return update( item , "options" , function( options ){
                return update( options , option , modify );
            } );
        }
    }

    /**
     *  - 이렇게 맨들어 두면 option 을 변경할 때마다
     *    updateOption 함수를 호출하면 된다!!
     *
     *  --> 객체( 제품 )과 키( 옵션 이름 ) 와 값( 옵션 )을 바꾸는 함수를 받는다
     *
     */
}

/**
 *           ===== update2() 도출하기 =====
 *
 *      - 암묵적 인자가 두개 있는 코드를 리팩터링 했다
 *      --> 리팩터링을 하니 새로운 암묵적 인자가 생겼다
 *      --> 한번 더 리팩터링하면 일반적인 함수인 update2()를 도출할 수 있다
 */
title( 'update2() 도출하기' );
{
    var shirt = {
        name : "shirt",
        price : 13,
        options : {
            color : "blue",
            size : 3
        }
    }

    // 이 리팩터링을 하고나면 더 일반적인 함수가 된다
    title( '명시적 인자가 있는 코드' );
    {
        // 함수 이름의 숫자 2는 두 번 중첩되었다는 뜻
        function update2( object , key1 , key2 , modify ){
            // 더 일반적인 함수이므로 인자 이름도 일반적으로 바꾼다
            return update( object , key1 , function( value1 ){
                return update( value1 , key2 , modify );
            } );
        }
    }
    /**
     *  - 이제 더 일반적인 함수가 되었다.
     *  --> update2() 는 두 단계로 중첩된 어느 객체에서도 쓸 수 있는 함수다
     *  --> 따라서, 함수를 쓸 때 두개의 키가 필요하다
     */

    title( '바뀐코드 비교' );
    {
        // 기존 코드
        function incrementSize( item ){
            var options = item.options; // 1. 조회
            var size = options.size;    // 2. 조회
            var newSize = size + 1;     // 3. 변경
            var newOptions = objectSet( options , "size" , newSize );   // 4. 설정
            var newItem = objectSet( item , "options" , newOptions );   // 5. 설정
            return newItem;
        }

        // 리팩터링한 코드
        function incrementSize( item ){
            return update2( item , "options" , "size" , function( size ){
                return size + 1;
            } )
        }
    }

    /**
     *  - 이제 조회, 조회 , 변경 , 설정 , 설정 패턴을 직접 구현하지 않아도 update2()를 사용하면 된다
     *  --> update2()는 조금 추상적이기 때문에 시각화가 필요하다
     */
}

/**
 *  - 와 진심 무쳤다!! 리팩터링으로 이렇게나 깰꾸미해지냐...
 *
 */