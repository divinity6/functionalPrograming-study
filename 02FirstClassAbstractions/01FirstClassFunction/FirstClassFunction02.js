/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 코드의 냄새 : 함수 이름에 있는 암묵적 인자 =====
 *
 *      - 요구사항에 맞춰 함수를 맨들었다. 그러나 모든 함수가 비슷하다
 */
title( '요구사항에 맞춰 함수를 맨들었을 뿐!!' );
{
    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }
    title( '비슷하게 생긴 함수들' );
    {
        function setPriceByName( cart , name , price ){
            var item = cart[ name ];
            var newItem = objectSet( item , 'price' , price );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }

        function setQuantityByName( cart , name , quant ){
            var item = cart[ name ];
            var newItem = objectSet( item , 'quantity' , quant );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }

        function setShippingByName( cart , name , ship ){
            var item = cart[ name ];
            var newItem = objectSet( item , 'shipping' , ship );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }

        function setTaxByName( cart , name , tax ){
            var item = cart[ name ];
            var newItem = objectSet( item , 'tax' , tax );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }
    }

    /**
     *  - 위 함수들은 문자열만 다르다
     *
     *  --> 문자열이함수 이름에 그대로 들어있다
     *  --> 함수의 필드를 결정하는 문자열이 함수 이름에 그대로 들어있다
     *      즉, 함수 이름에 있는 일부가 인자처럼 동작하는 듯이 보인다
     *
     *  - 함수 이름에 있는 암묵적 인자( implicit argument in function name )
     *  --> 값을 명시적으로 전달하지 않고, 함수 이름의 일부로 전달하고 있다
     *  --> 함수 이름이 구현 전체를 가르키지 않고, 구현의 특정부분을 가르키고 있다
     */
    var cart = {}
    cart = setPriceByName( cart , 'shoe' , 13 );
    cart = setQuantityByName( cart , 'shoe' , 3 );
    cart = setShippingByName( cart , 'shoe' , 0 );
    cart = setTaxByName( cart , 'shoe' , 2.34 );
}