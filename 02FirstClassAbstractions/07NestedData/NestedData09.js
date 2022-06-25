/**
 * 프로그람 설명문서 주석
 * 2022.06. 25
 *
 *
 *           ===== 재귀함수가 적합한 이유 =====
 *
 *      - 지금까지는 배열을 반복해서 처리하기위해 for 루프문을 사용했다
 *      --> 함수형 도구들도 배열을 반복하는 것을 대신하기 위해 구현했다
 *
 *      - 그러나 중첩된 데이터를 다룰때는 재귀함수가 좋다
 *
 *      - 원래 배열을 반복할때는 배열의 첨부터 끝까지 처리하고 결과 배열에 처리한
 *        항목을 추가했다
 *        ( 배열은 차례대로 처리한다 )
 *
 *      - 중첩된 데이터를 다루는 방법은 점점 아래단계로 내려가면서 최종값에 도착하면
 *        값을 변경하고, 나오면서 새로운 값을 설정한다
 *
 *      --> 새로운 값 설정시 카피-온-라이트 원칙에 따라 복사본을 맨든다
 *
 *      - 재귀, 호출스택등을 사용하지 않고 중첩된 데이터를 다루기 어렵다
 */
title( '재귀 호출 연습' )
{
    function incrementSizeByName( cart , name ){
        var keys = [ "cart" , "shirts" , "options" , "size" ]
        return nestedUpdate( cart , keys , function( size ){
            return size + 1;
        }  )
    }

    function nestedUpdate( object , keys , modify ){
        if ( 0 === keys.length ){
            return modify( object );
        }
        var key1 = keys[ 0 ];
        var restOfKeys = drop_first( keys );
        return update( object , key1 , function( value ){
            return nestedUpdate( value , restOfKeys , modify );
        } )
    }
}

/**
 *           ===== 중첩된 구조를 설계시 생각할 점 =====
 *
 *      - 깊이 중첩된 데이터에 nestedUpdate()를 사용하면 긴 Key 경로가 필요하다
 *      --> 키 경로가 길면 중간 객 체가 어떤 키를 가졌는지 기억하기 어렵다
 *
 *      - 경로에 따라 중첩된 각 단계에는 기억해야할 새로운 데이터 구조가 있다
 *      --> 따라서 , 각 데이터 구조에 어떤 키가 있는지 기억하기는 어렵다
 *
 *      - 중간 객체들은 서로 다른 키를 가졌지만 nestedUpdate() 경로를 보고 어떤 키가
 *        있는지 알 수 없다
 *
 *      - 이럴때 추상화의 벽을 사용하면 된다
 */