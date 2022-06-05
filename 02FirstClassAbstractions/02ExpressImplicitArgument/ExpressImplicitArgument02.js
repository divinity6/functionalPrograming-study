/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 일급인 것과 일급이 아닌 것을 구별하기 =====
 *
 *      - JS 에는 일급이 아닌 것도 많이 있다
 *      --> 예) +연산자, *연산자등 수식연산자는 일급이 아니다
 *              값이 아니기 때문에 일급이 아닌것이다
 *
 *      ----> primitive value 를 일급이라고 하는것인가...?
 *            아, 그냥 인자로 못넘기는 거( 참조 불가능한 것 )를 일급이라고 하는거 같은데...?
 *
 *      - JS 에서 일급이 아닌 것
 *
 *      1. 수식 연산자
 *
 *      2. 반복문
 *
 *      3. 조건문
 *
 *      4. try/catch 블록
 *
 *      - 일급으로 할 수 있는 것
 *
 *      1. 변수에 할당
 *
 *      2. 함수의 인자로 넘기기
 *
 *      3. 함수의 리턴값으로 받기
 *
 *      4. 배열이나 객체에 담기
 *
 *
 *      - 일급이 아닌 것을 찾고 일급으로 바꾸는 능력!! 매우 중요하다
 *
 */
title( '런타임 검사 방법으로 필드명이 올바른지 확인하는 코드' );
{
    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }
    {
        var validItemFields = [ 'price' , 'quantity' , 'shipping' , 'tax' ];

        function setFieldByName( cart , name , field , value ){

            // 필드가 일급 값이기 때문에 런타임에 확인하는 것은 쉽다
            if ( !( validItemFields.includes( field ) ) ){
                throw "Not a valid item field : " + "'" + field + "'.";
            }

            var item = cart[ name ];
            var newItem = objectSet( item , field , value );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }
    }
}
/**
 *          ===== 일급 필드를 사용하면 API 를 바꾸기 더 어려울까? =====
 *
 *      - 엔티티( entity : 독립체 ) 필드명을 일급으로 맨들어 사용하면 세부 구현을 밖으로
 *        노출하는 것이 아닐까?
 *
 *      - 장바구니 제품은 필드명과 함께 추상화 벽 아래에 정의한 객체다
 *      --> 필드명을 추상화 벽 위의 API 문서에 명시하면 영원히 필드명을 바꾸지 못하는게 아닐까?
 *
 *      - 맞다. 필드명은 계속 유지해야한다
 *        but, 구현이 외부에 노출된 것은 아니다
 *
 *      --> 내부에서 정의된 필드명이 바뀐다고 해도 사용하는 사람들이 원래 필드명을 그대로
 *          사용하게 할 수 있다
 *
 *          예) quantity 필드명 --> number 로 변경
 *              추상화 벽위에서는 그대로 사용하고 내부에서 변경해주면 된다
 */
title( '필드명이 변경 되었을시 추상화의 벽 내부에서 변경 후 사용' );
{
    function objectSet( object , key , value ){
        return Object.assign( {} , object )[ key ] = value;
    }
    {
        var validItemFields = [ 'price' , 'quantity' , 'shipping' , 'tax' ];
        var translations = { 'quantity' : 'number' };

        function setFieldByName( cart , name , field , value ){

            // 필드가 일급 값이기 때문에 런타임에 확인하는 것은 쉽다
            if ( !( validItemFields.includes( field ) ) ){
                throw "Not a valid item field : " + "'" + field + "'.";
            }

            // 원래 필드명을 새로운 필드명으로 바꾸면 됨
            if ( translations.hasOwnProperty( field ) ){
                field = translations[ field ];
            }

            var item = cart[ name ];
            var newItem = objectSet( item , field , value );
            var newCart = objectSet( cart , name , newItem );
            return newCart;
        }
    }
}
/**
 *  - 이런 방법들도 필드명이 일급이기 때문에 할 수 있는 것이다
 *  --> 필드명이 일급 - 객체나 배열에 담을 수 있다
 *
 */