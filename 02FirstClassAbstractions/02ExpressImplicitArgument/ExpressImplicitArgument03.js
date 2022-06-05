/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 일급 값 연습 =====
 *
 */
title( '암묵적 인자 드러내기' );
{
    title( '함수 이름에 있는 암묵적 인자들' );
    {
        function multiplyByFour( x ){
            return x * 4;
        }
        function multiplyBySix( x ){
            return x * 6;
        }
        function multiplyBy12( x ){
            return x * 12;
        }
        function multiplyByPi( x ){
            return x * 3.14159;
        }
    }
    title( '리팩터링 : 함수 이름에 있는 암묵적 인자들' );
    {
        function multiply( x , y ){
            return x * y;
        }
    }
    console.log('-----------------------------------------------')

    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }

    title( '함수 이름에 있는 암묵적 인자들-2' );
    {
        function incrementQuantityByName( cart , name ){
            var item = cart[ name ];
            var quantity = item[ 'quantity' ];
            var newQuantity = quantity + 1;
            var newItem = objectSet( item , 'quantity' , newQuantity );
            var newCart = objectSet( cart , item , newItem );
            return newCart;
        }

        function incrementSizeByName( cart , name ){
            var item = cart[ name ];
            var size = item[ 'size' ];
            var newSize = size + 1;
            var newItem = objectSet( item , 'size' , newSize );
            var newCart = objectSet( cart , item , newItem );
            return newCart;
        }


    }
    title( '리팩터링 : 함수 이름에 있는 암묵적 인자들-2' );
    {
        function incrementFieldByName( cart , name , field ){
            var item = cart[ name ];
            var newValue = item[ field ];
            var newField = newValue + 1;
            var newItem = objectSet( item , field , newField );
            var newCart = objectSet( cart , item , newItem );
            return newCart;
        }
    }
    console.log('-----------------------------------------------')
    title( '런타임 체크 추가, 필드의 값인 size, quantity 가 아니면 예외 체크' );
    {
        function incrementFieldByName( cart , name , field ){
            var validItemFields = [ 'size' , 'quantity' ];
            if( !( validItemFields.includes( field ) ) ){
                new Error( field + '는 필드에 없는 값입니다' );
            }
            var item = cart[ name ];
            var newValue = item[ field ];
            var newField = newValue + 1;
            var newItem = objectSet( item , field , newField );
            var newCart = objectSet( cart , item , newItem );
            return newCart;
        }
    }
}
