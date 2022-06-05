/**
 * 프로그람 설명문서 주석
 * 2022.06. 05
 *
 *
 *           ===== 카피-온-라이트 고차 함수 =====
 *
 *      -
 */
title( '카피-온-라이트 고차 함수 연습' );
{
    title( 'withArrayCopy() 함수 적용' );
    {
        function withArrayCopy( array , modify ){
            var copy = array.slice();
            modify( copy );
            return copy
        }

        function push( array , elem ){
            return withArrayCopy( array , function( copy ){
                copy.push( elem );
            } );
        }

        function drop_first( array ){
            return withArrayCopy( array , function( copy ){
                copy.shift();
            } );
        }

        function drop_last( array ){
            return withArrayCopy( array , function( copy ){
                copy.pop();
            } );
        }
    }

    title( '객체에 copy-on-light 적용' );
    {
        function objectSet( object , key , value ){
            return withObjectCopy( object , function( copy ){
                copy[ key ] = value
            } );
        }

        function objectDelete( object , key ){
            return withObjectCopy( object , function( copy ){
                delete copy[ key ];
            } );
        }

        function withObjectCopy( object , modify  ){
            var copy = Object.assign( {} , object );
            modify( copy );
            return copy;
        }
    }

    title( 'try-catch 구문 중복코드 들어내기' );
    {
        function tryCatch( f , errorHandler ){
            try{
                f();
            }
            catch ( e ){
                errorHandler( e );
            }
        };
    }

    title( 'if 구문 리팩터링 - 실용적이지 않으나 연습용' );
    {
        try{
            // 리팩터링 해야할 함수
            function refactor(){
                if ( array.length === 0 ){
                    console.log( "Array is empty" );
                }

                if ( hasItem( cart , "shoes" ) ){
                    return setPriceByName( cart , "shoes" , 0 );
                }
            }

            function when( test , then ){
                if ( test ){
                    return then();
                }
            }

            when( array.length === 0 , function(){
                console.log( "Array is empty" );
            } )

            when( hasItem( cart , "shoes" ) , function(){
                return setPriceByName( cart , "shoes" , 0 );
            } )

        }
        catch( e ){
            console.log( '연습용 입니다!!' );
        }
    }

    title( 'if 구문에 else 추가' );
    {
        IF( array.length === 0 , function(){
            console.log( "Array is empty" );
        } , function(){
            console.log( 'Array has something in it.' );
        } )

        IF( hasItem( cart , "shoes" ) , function(){
            return setPriceByName( cart , "shoes" , 0 );
        } , function(){
            return cart;
        } )

        function IF( test , then , ELSE ){
            if ( test ){
                then();
            }
            else {
                ELSE();
            }
        }
    }

}
