/**
 * 프로그람 설명문서 주석
 * 2022.05. 28
 *
 *
 *           ===== 카피-온-라이트( copy-on-write ) =====
 *
 *      1. 쓰기와 읽기를 동시에 하는 함수는 가능하면 분리하는 것이 좋다
 *        ( 책임을 분리 )
 *      2. 그게 아니면, 값을 2개 리턴하게 하면 된다
 */

title( '1. shift 메서드를 읽기와 쓰기로 분리' );
{
    /**
     *            ===== shift =====
     *  - 배열의 첫번째 값을 삭제하고, 삭제한 값을 리턴
     */

    // 기본 읽기동작( 첫번째 값 )
    function first_element( array ){
        return array[ 0 ];
    }
    // 카피-온-라이트 를 적용해 읽기로 변경
    function drop_first( array ){
        var array_copy = array.slice();
        array_copy.shift();
        return array_copy;
    }
}

title( '2. 값을 2개로 리턴' );
{
    function shift( array ){
        var array_copy = array.slice();
        var first = array_copy.shift();
        return {
            first,
            array : array_copy
        }
    }

    // 상단의 동작 사용
    function shift( array ){
        return {
            first : first_element( array ),
            array : drop_first( array )
        }
    }
}
/**
 *  - 카피-온-라이트를 적용하면 모든 동작은 읽기가 된다
 *  --> 불변성이된다!!
 */
title( '불변성으로 맨들기' );
{
    // push 리팩터링
    function push( array , elem ){
        var array_copy = array.slice();
        array_copy.push( elem );
        return array_copy;
    }

    // add_contact() 리팩터링
    function add_contact( mailing_list , mail ){
        return push( mailing_list , mail );
    }

    // arraySet() 함수 맨들기
    function arraySet( array , idx , value ){
        var array_copy = array.slice();
        array_copy[ idx ] = value;
        return array_copy;
    }
}
/**
 *  - 불변 데이터 구조를 읽는 것은 계산이다
 *
 *  --> 변경 가능한 데이터를 읽는 것은 액션
 *
 *  --> 변경 불가능한 데이터를 읽는 것은 계산
 *
 *  ----> 따라서, 쓰기는 데이터를 변경하기 때문에
 *        쓰기가 없다면 데이터는 불변형이라고 할 수 있다
 */