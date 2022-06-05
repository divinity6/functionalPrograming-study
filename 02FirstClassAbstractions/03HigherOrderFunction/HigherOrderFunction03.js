/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 카피-온-라이트 고차 함수 =====
 *
 *      -
 */
title( '카피-온-라이트 고차 함수' );
{
    title( '카피-온-라이트 적용 중복함수' );
    {
        function arraySet( array , idx , value ){
            var array_copy = array.slice();
            array_copy[ idx ] = value;
            return array_copy;
        }

        function push( array , elem ){
            var array_copy = array.slice();
            array_copy.push( elem );
            return array_copy;
        }

        function drop_first( array ){
            var array_copy = array.slice();
            array_copy.shift();
            return array_copy;
        }

        function drop_last( array ){
            var array_copy = array.slice();
            array_copy.pop();
            return array_copy;
        }
    }
    title( '고차 함수로 변경' );
    {
        function arraySet( array , idx , value ){
            return withArrayCopy( array , function( copy ){
                copy[ idx ] = value;
            } );
        }

        function withArrayCopy( array , modify ){
            var copy = array.slice();
            modify( copy );
            return copy;
        }
    }
    /**
     *  - 어떤 코드는 리팩터링을 하고 코드가 더 짧아지지만,
     *    짧아지는 것보다 더 많은 이점을 얻을 수 있는 경우도 있다
     *
     *  1. 표준화된 원칙
     *
     *  2. 새로운 동작에 원칙을 적용할 수 있음
     *
     *  3. 여러 개를 변경할 때 최적화
     */
}
/**
 *  - 복사본을 많이 맨들게 되면, 느려진다.
 *  --> 그러나 복사본을 한번만 맨들어 쓰면 느려지지 않는다
 */