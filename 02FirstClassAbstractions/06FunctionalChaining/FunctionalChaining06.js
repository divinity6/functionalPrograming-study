/**
 * 프로그람 설명문서 주석
 * 2022.06. 11
 *
 *
 *           ===== 함수형 체이닝 연습 =====
 *
 *      ( 진짜 무친듯이 나눠야 겠네... 기능은 진짜 하나만!! )
 *
 *      - 체이닝 디버깅을 위한 팁
 *
 *      @구체적인것을유지하기
 *      - 데이터를 처리하는 과정에서 데이터가 어떻게 생겼는지 잊어버리기 쉽다
 *      --> 파이프라인 단계가 많다면 더 잊어버리기 쉽다
 *      --> 각, 단계에서 어떤 것을 하고있는지 알기 쉽게 이름을 잘지어야 한다
 *      --> x 나 a 같은 변수명은 짧지만 아무 의미가 없다.
 *          ( 의미를 기억하기 쉽게 이름을 붙여라 )
 *
 *      @출력해보기
 *      - 경험이 많은 함수형 개발자도 중간에 어떤 데이터가 생기는지 잊는 경우가 있다
 *      --> 이럴 경우 각 단계 사이에 print 구문을 넣어 코드를 돌려본다
 *
 *      - 복잡한 체인일 경우 각 단계씩 추가해 결과를 확인하고 다음 단계를 추가하라
 *
 *      @타입을따라가보기
 *      - 함수형 도구는 정확한 타입이 있다.
 *      --> js 처럼 타입이 없는 언어를 사용해도 함수형 도구는 타입이 있다
 *      --> 다만 컴파일 타임에 타입을 검사하지 않을 뿐이다
 *      --> 각 단계를 지나는 값의 타입을 따라가 보아라
 *
 *      - map()은 새로운 배열을 리턴한다. 어떤 값인지 몰라도 콜백이 리턴하는
 *        타입의 값이 들어있을 것이다
 *
 *      - reduce()의 결괏값은 콜백이 리턴하는 값과 같다. 또한, 초깃값과도 같다
 *
 *      - 이런식으로 각 단계에서 맨들어지는 값의 타입을 따라가면서 단계를 살펴볼 수 있다
 *        ( 이런 방법은 코드를 이해하고, 문제를 디버깅하는데 도움이 된다 )
 */

title( '함수형 체이닝 연습' );
{
    title( '기존의 더러운 코드' )
    function shoesAndSocksInventory( products ){
        var inventory = 0;
        for ( var p = 0; p < products.length; p++ ){
            var product = products[ p ];
            if ( product.type === 'shoes' || product.type === "socks" ){
                inventory += product.numberInInventory;
            }
        }
        return inventory;
    }

    title( '리팩터링' );
    function shoesAndSocksInventory2( products ){

        var shoesAndSocks = filter( products , function( product ){
            if ( product.type === 'shoes' || product.type === "socks" ){
                return product;
            }
        } )

        // 여기서는 값만 추출하고...
        var inventories = map( shoesAndSocks , function( shoesAndSock ){
            return shoesAndSock.numberInInventory;
        } )

        // 그치 애는 값을 누적하는 것만 해야지
        return reduce( inventories , 0 , function( a , b ){
            return a + b;
        } )
    }

    function reduce( array , init, f ){
        var accum = init;
        array.forEach( item => {
            accum = f( accum , item );
        } );
        return accum;
    }

    function filter( array , f ){
        return reduce( array , [] , function( newArr , item ){
            if ( f( item ) ){
                newArr.push( item );
            }
            return newArr;
        } );
    }
}

