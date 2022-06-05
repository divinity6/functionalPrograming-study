/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 리팩터링 : 암묵적 인자 드러내기( express implicit argument ) =====
 *
 *      - 함수 이름의 일부가 암묵적 인자로 사용되고 있다면, 암묵적 인자 드러내기 리팩터링을 사용할 수 있다
 *      --> 암묵적 인자를 명시적 인자로 바꾸는 것
 *      --> express!! 암묵적인 것을 명시적으로 바꾸는 것
 */
title( '암묵적 인자를 명시적 인자로 변경' );
{
    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }
    {
        // 명시적인 인자를 추가, 인자는 더 일반적인 이름으로 바꾼다
        function setFieldByName( cart , name , field , value ){
            var item = cart[ name ];
            var newItem = objectSet( item , field , value );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }

        var cart = {}
        // 새로운 인자를 사용한다
        cart = setFieldByName( cart , "shoe" , 'price' , 13 );
        cart = setFieldByName( cart , "shoe" , 'quantity' , 3 );
        cart = setFieldByName( cart , "shoe" , 'shipping' , 0 );
        cart = setFieldByName( cart , "shoe" , 'tax' , 2.34 );

    }
    /**
     *  - 리팩터링으로 비슷한 함수를 모두 일반적인 함수 하나로 바꾸었다
     *  --> 리팩터링으로 필드명을 일급 값으로 맨들었다
     *
     *  - 이제 API 명세를 작성하여 함수하나, 필드명만 알면 새로운 필드를 만들때마다
     *    새로운 함수를 작성하지 않아도 된다
     */
}
/**
 *  - 일급 값은 언어 전체, 어디에서나 사용할 수 있는 값!!!
 *  --> 값을 일급으로 맨들어야 한다
 *
 *  --> 일급 값은 언어에 있는 다른 값처럼 사용할 수 있다
 *
 */