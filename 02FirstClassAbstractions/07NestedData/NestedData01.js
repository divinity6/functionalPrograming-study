/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== 객체를 다루기 위한 고차 함수 =====
 *
 *      - 필드명을 명시적으로 맨들기
 *
 *      --> 필드명이 함수 이름에 들어가면 안된다( 중복되고 냄새나는 코드가 됨 )
 *
 *      - 그런데 필드명을 명시적으로 맨들어도 동작이 함수명에 포함되는 경우가 있다
 *
 */

title( '필드명을 명시적으로 변경' );
{
    title( '암묵적 인자를 드러내기' );
    {
        function incrementQuantity( item ){
            var quantity = item[ 'quantity' ];
            var newQuantity = quantity + 1;
            var newItem = objectSet( item , 'quantity' , newQuantity );
            return newItem;
        }
        // 리팩터링

        function incrementField( item , field ){
            var value = item[ field ];
            var newValue = value + 1;
            var newItem = objectSet( item , field , newValue );
            return newItem;
        }

        /**
         *  - 리팩터링 후 필드명이 함수이름에서 빠지며 많은 중복들을 들어낼수 있었다
         *  --> 그러나 동작이름이 함수명에 박혀있어 또다른 중복이 시작될 수 있다
         */
    }
}

/**
 *           ===== update() 도출하기 1 =====
 *
 *      - 하려는 동작만 다르고 동작은 모두 비슷하다면,
 *        이 함수들로 어떤 객체라도 바꿀 수 있는 함수를 도출하면
 *        중복을 많이 줄일 수 있다
 *
 *      - 이 상황에서는 동시에 두 가지 리팩터링을 해야한다
 *
 *      1. 암묵적 인자 드러내기 ( express implicit argument )
 *
 *      2. 함수 본문을 콜백으로 바꾸기 ( replace body with callback )
 *
 *      - 암묵적 인자를 드러내야할 인자가 일반 값이 아니고 동작이다
 *        따라서, 리팩터링 동작을 콜백으로 변경해야 한다
 */
title( 'update 도출하기 1' );
{
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

    function incrementField( item , field ){
        return updateField( item , field , function( value ){
            return value + 1;
        } )
    }

    function updateField( item , field , modify ){
        var value = item[ field ];
        var newValue = modify( value );
        var newItem = objectSet( item , field , newValue );
        return newItem;
    }

    /**
     *  - 모든 동작이 비슷하기 때문에 고차함수 하나로 합쳐버린 것
     */
}

/**
 *           ===== update() 도출하기 2 =====
 *
 *      - 모든 동작을 고차 함수 하나로 합쳤다
 *      --> 특정 필드를 바꾸는 동작을 콜백으로 전달할 수 있다
 *          ( 특정 필드를 바꾸는 함수가 아니기 때문에 함수 이름에 field 는 빼고 일반적인 이름으로 변경 )
 */
title( 'update 도출하기 2' );
{
    function update( object , key , modify ){
        var value = object[ key ];   // 값을 가지고와서
        var newValue = modify( value ); // 변경하고
        var newObject = objectSet( object , key , newValue ); // 설정한다
        return newObject;
    }

    /**
     *  - update() 는 객체에 있는 값을 바꾼다
     *  --> 바꾸려는 객체와 키, 동작을 함수로 넘기면 된다
     *  --> 이 함수는 objectSet() 을 사용하기 때문에 카피-온-라이트 원칙을 따른다
     */
}