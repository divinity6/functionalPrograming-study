/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== update() =====
 *
 *      - 조회하고 변경하고 설정하는 것을 update()로 교체하기
 *
 *      1. 조회하고 바꾸고 설정하는 것을 찾는다
 *
 *      2. 바꾸는 동작을 콜백으로 전달해서 update()로 교체한다
 *
 *      --> 중첩된 객체에 적용하기 좋다
 *
 *      - update 함수형 도구는 객체를 다룰 때 쓰는 함수형 도구
 *
 *      --> 단계
 *          1. 조회
 *          --> 키를 가지고 객체에서 값을 조회
 *
 *          2. 변경
 *          --> 현재 값으로 modify()를 불러 새로운 값 생성
 *
 *          3. 설정
 *          --> 복사본을 생성
 *
 */

title( '연습 문제' );
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

    title( 'lowercase 적용' );
    {
        var user = {
            firstName : "Joe",
            lastName : 'Nash',
            email : "JOE@EXAMPLE.COM",
        }

        update( user , "email" , lowerCase );

        function lowerCase( string ){
            return string.toLowerCase();
        }
    }

    title( '제품의 수량을 10배씩 늘려주는 버튼' );
    {
        var item = {
            name : "shoes",
            price : 7,
            quantity : 2,
        }

        function tenXQuantity( item ){
            return update( item , "quantity" , function( quantity ){
                return quantity * 10;
            } );
        }
    }
}
