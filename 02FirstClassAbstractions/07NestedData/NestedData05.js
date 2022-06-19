/**
 * 프로그람 설명문서 주석
 * 2022.06. 19
 *
 *
 *           ===== update2() 시각화 하기 =====
 *
 *      - update2()는 너무 많은 일을 한다
 *
 *      --> options 키를 가지고 한단계들어가고 , size 키를 가지고 값에 접근한다
 *      ----> 이 키를 모아 리스트로 맨들면 경로( path )로 부를 수 있다
 *      ----> 경로로 중첩된 데이터의 어떤 부분을 가르키는지 표현할 수 있다
 *
 *      - 중첩된 객체의 값을 가르키는 시퀀스를 경로( path )라고 한다
 *      --> 경로는 중첩된 각 단계의 키를 포함한다
 */

title( 'update2 시각화하기' );
{
    title( '여러단계 중첩된 데이터' )
    var cart = {
        shirt : {
            name : "shirt",
            price : 13,
            options : {
                color : "blue",
                size : 3
            }
        }
    }

    title( 'incrementSizeByName()를 맨드는 네가지 방법' );
    {
        title( 'incrementSizeByName() 이름으로 사이즈를 늘리기' );
        {
            // 이미 있는 도구를 활용한 직관적인 방법
            function incrementSizeByName( cart , name ){
                return update( cart , name , incrementSize );
            }
        }

        title( 'update() 와 update2()로 맨들기' );
        {
            function incrementSizeByName( cart , name ){
                return update( cart , name , function( item ){
                    // update() 안에 있는 update2()로 incrementSize()를 인라인으로 구현
                    return update2( item , "options" , "size" , function( size ){
                        return size + 1;
                    } )
                } );
            }
        }

        title( 'update()로 맨들기' );
        {
            function incrementSizeByName( cart , name ){
                return update( cart , name , function( item ){
                    return update( item , "options" , function( options ){
                        // update() 만 불러서 인라인으로 구현
                        return update( options , "size" , function ( size ){
                            return size + 1;
                        } )
                    } )
                } );
            }
        }

        title( '조회하고 바꾸고 설정하는 것을 직접 맨들기' );
        {
            function incrementSizeByName( cart , name ){
                var item = cart[ name ];        // 조회
                var options = item.options;     // 조회
                var size = options.size;        // 조회
                var newSize = size + 1;         // 변경
                var newOptions = objectSet( options , "size" , newSize );   // 설정
                var newItem = objectSet( item , "options" , newOptions );   // 설정
                var newCart = objectSet( cart , name , newItem );           // 설정
                return newCart;
            }
        }

        /**
         *  - 위의 네가지 방법 중 어떤 방법으로 짜든 맴에 안들고 코드가 드러워진다
         *  --> 다른방법! update3()을 도출하는 방법을 사용하면 된다!
         */
    }

    title( 'update3() 도출하기' );
    {
        function update3( object , key1 , key2 , key3 , modify ){
            return update( object , key1 , function( object2 ){
                return update2( object2 , key2 , key3 , modify );
            }  )
        }

        function incrementSizeByName( cart , name ){
            // 세 개의 경로
            return update3( cart , name , "options" , "size" , function( size ){
                return size + 1;
            } )
        }

        /**
         *  - update3()은 update() 안에 update2()를 중첩한 모습이다
         *  --> 두 단계만 들어갈 수 있는 update2()에 update()를 사용해
         *      한 단계 더 들어간다
         */
    }
}

title( '연습문제- update4, 5 맨들어보기' );
{
    function update4( object , key1 , key2 , key3 , key4 , modify ){
        return update( object , key1 , function( object2 ){
            return update3( object2 , key2 , key3 , key4 , modify );
        }  )
    }

    function update5( object , key1 , key2 , key3 , key4 , key5 , modify ){
        return update( object , key1 , function( object2 ){
            return update4( object2 , key2 , key3 , key4 , key5 , modify );
        } )
    }

    /**
     *  - 미친... 콜백 개더러워지네
     *  --> 개드럽다 증말...
     */
}