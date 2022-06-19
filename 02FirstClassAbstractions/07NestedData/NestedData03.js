/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== 중첩된 객체에 update 사용하기 =====
 *
 *      - 객체 내부에 들어있는 객체에 update 적용하기
 */

title( '기존의 중첩된 객체' );
{
    title( '공용 도구' );
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

    function update( object , key , modify ){
        var value = object[ key ];   // 값을 가지고와서
        var newValue = modify( value ); // 변경하고
        var newObject = objectSet( object , key , newValue ); // 설정한다
        return newObject;
    }

    title( '중첩된 객체' );
    {
        var shirt = {
            name : "shirt",
            price : 13,
            options : {
                color : "blue",
                size : 3
            }
        }

        function incrementSize( item ){
            var options = item.options; // 1. 조회
            var size = options.size;    // 2. 조회
            var newSize = size + 1;     // 3. 변경
            var newOptions = objectSet( options , "size" , newSize );   // 4. 설정
            var newItem = objectSet( item , "options" , newOptions );   // 5. 설정
            return newItem;
        }
    }
    /**
     *  - 이렇게 데이터가 중첩되어 있을 경우 update 를 어떻게 사용해야 할까?
     *  --> 코드를 작성하다보면 이렇게 중첩된 데이터들이 겁나게 많지...
     */
}
/**
 *          ===== 중첩된 update 시각화하기 =====
 *
 *      - 위 함수는 중첩된 options 객체를 다루고 있다
 *        단계별로 살펴보겠다
 *
 *      1. 키를 가지고 객체에서 값을 조회( options )
 *
 *      2. 키를 가지고 객체에서 값을 조회( size )
 *
 *      3. 새로운 값을 생성( size + 1 )
 *
 *      4. 복사본 생성( objectSet )
 *
 *      5. 복사본 생성( objectSet )
 */

/**
 *          ===== 조회하고 변경하고, 설정하는 것을 update()로 교체하기 =====
 *
 *     - replace get , modify , set with update 리팩터링을 하려고 한다
 *
 *     - 조회, 변경, 설정을 update()로 교체하기의 단계
 *
 *     1. 조회하고 변경하고 설정하는 것을 찾는다
 *
 *     2. 바꾸는 동작을 콜백으로 전달해 update()로 교체한다
 */
title( '중첩된 객체에 update 사용하기' );
{
    title( '한번 리팩터링' );
    {
        function incrementSize( item ){
            var options = item.options;  // 조회
            var newOptions = update( options , "size" , increment ); // 변경
            var newItem = objectSet( item , "options" , newOptions ); // 설정
            return newItem
        }
    }

    title( '두번 리팩터링' );
    {
        function incrementSize( item ){
            return update( item , "options" , function( options ){
                // 안쪽 update() 는 바깥쪽 update() 의 콜백 함수 안에 있다
                return update( options , "size" , increment );
            } );
        }
    }
    /**
     *  - 중첩된 객체에 중첩된 update 를 사용할 수 있다
     *  --> update()를 중첩해서 부르면 더 깊은 단계로 중첩된 객체에도 사용할 수 있다
     */


}