import {createHash} from "crypto";
import React, {Component} from "react";

/**
 * Original Ascii art by Art by Praseodymium 59: http://ascii.co.uk/art/portal
 */
export class IntroBackgroundDoor extends Component{
    private readonly asciiBackgroundRestaurant: string[] = [
        "XXXXXXXXXX'         ~.                           \\                     /                             .~       `XXXXXXXXXX\n" +
        "XXXXXXXXX'            ~.                          -                   .                            .~          `XXXXXXXXX\n" +
        "  `XXX' T               ~.                         \\                 /                           .~             T `XXX'\n" +
        "  ,XXX. |                 ~.                        .               -                          .~               | ,XXX.\n" +
        "XXX` 'XXX                   ~.                       \\             /                         .~                 XXX` 'XXX\n" +
        "XXX. ,XXX                     ~.                      .6&&&&&&&&&A,                        .~                   XXX. ,XXX\n" +
        "  `XXX' T                       ~.             .6&&&&&&&&&&&&&&&&&&&&&&&A,               .~                     T `XXX'\n" +
        "  ,XXX. |._                       ~.     .6&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&A,       .~                     _.| ,XXX.\n" +
        "XXX` 'XXX  ~-._                     ~.6&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&A,~                   _.-~  XXX` 'XXX\n" +
        "XXX. ,XXX      ~-._              6&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&A              _.-~      XXX. ,XXX\n" +
        "  `XXX' T          ~-._       6&&&&&&&&&&&&&&&&&&/ -  '    --   ~~     \\&&&&&&&&&&&&&&&&&&A       _.-~          T `XXX'\n" +
        "  ,XXX. |              ~-._ 6&&&&&&&&&&&&&&&/      ~~  --          *        \\&&&&&&&&&&&&&&&A _.-~              | ,XXX.\n" +
        "XXX` 'XXX                  &&&&&&&&&&&&&/            ~~         .               \\&&&&&&&&&&&&&                  XXX` 'XXX\n" +
        "XXX. ,XXX                  &&&&&&&&&&/          ,              __._    _.'         \\&&&&&&&&&&                  XXX. ,XXX\n" +
        "  `XXX' T                  && $                          ---       `-.'                   $ &&                  T `XXX'\n" +
        "  ,XXX. |~~..__            &&$         _.      . ========================         ~~       $&&            __..~~| ,XXX.\n" +
        "XXX` 'XXX      ~~..__      && $       ~         // '    '    ;    '   . \\\\                $ &&      __..~~      XXX` 'XXX\n" +
        "XXX. ,XXX            ~~..__&&$     .-~    ~~   //  .    `    `    |   `  \\\\  *            $&&__..~~            XXX. ,XXX\n" +
        "  `XXX' T                  && $               //   .    '    ;    `   .   \\\\              $ &&                  T `XXX'\n" +
        "  ,XXX. |                  &&$          .     ||   |    |   ___   '   :   ||        *'     $&&                  | ,XXX.\n" +
        "XXX` 'XXX                  && $     *         ||   `    ;   ) (   ;   .   ||              $ &&                  XXX` 'XXX\n" +
        "XXX. ,XXX                  &&$                ||   '    ,  (###)  `   ;   ||               $&&                  XXX. ,XXX\n" +
        "  `XXX' T                  && $              (||   |    '   ---   |   !   ||              $ &&                  T `XXX'\n" +
        "  ,XXX. |_________________.&&$  . .     . _ .(||   `    `  (###)  '   |   ||   . ,  _  . . $&&._________________| ,XXX.\n" +
        "XXX` 'XXX                  && $               ||   |    ;   ) (   ,   ;   ||              $ &&                  XXX` 'XXX\n" +
        "XXX. ,XXX                  &&$       ~        ||   :    :   ---   .   _   ||           ~~  $&&                  XXX. ,XXX\n" +
        "  `XXX' T                  && $          ~   .||   ;    |    ;    ;  (_)  || ~~_          $ &&                  T `XXX'\n" +
        "  ,XXX. |                  &&$   ~   .        ||   .    '    .    '   ;   ||               $&&                  | ,XXX.\n" +
        "XXX` 'XXX                  && $            ~~ ||   |    .    ,    |   .   ||              $ &&                  XXX` 'XXX\n" +
        "XXX. ,XXX            __..~~&&$       ~~-      ||   .    .    `    ;   |   ||      ~        $&&~~..__            XXX. ,XXX\n" +
        "  `XXX' T      __..~~      && $              (||   :    ,    :    :   :   ||              $ &&      ~~..__      T `XXX'\n" +
        "  ,XXX  |__..~~            &&$            .-~(||   ;    |    .    |   ;   ||~-.      _~    $&&            ~~..__| ,XXX.\n" +
        "XXX` 'XXX                  && $        .-~    ||   |    :    |    '   .   ||   ~-.        $ &&                  XXX` 'XXX\n" +
        "XXX. ,XXX                  &&$    ~~.-~____   ||   ;    `    .    `   |   ||___   ~-.      $&&                  XXX. ,XXX\n" +
        "  `XXX' T                  && $  .-~        __||   ,    '    ,    :   .   ||    ___  ~-.  $ &&                  T `XXX'\n" +
        "  ,XXX. |                _.&&$    ~   --      ||   .    |    .    '   '   ||            ~-.$&&._                | ,XXX.\n" +
        "XXX` 'XXX            _.-~ &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& ~-._            XXX` 'XXX\n" +
        "XXX. ,XXX        _.-~   _&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&_   ~-._        XXX. ,XXX\n" +
        "  `XXX' T    _.-~     -'-------------------------------------------------------------------------`-     ~-._    T `XXX'\n" +
        "  ,XXX. |_.-~       _&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&_       ~-._| ,XXX.\n" +
        "XXX` 'XXXT        -'---------------------------------------------------------------------------------`-        TXXX` 'XXX\n" +
        "XXX. ,XXX|      _&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&_      |XXX. ,XXX\n" +
        "XXXXXXXXX!____-'-----------------------------------------------------------------------------------------`-____!XXXXXXXXX\n" +
        "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXPraseodymium 59"
    ];

    render() {
        let itemsList = this.asciiBackgroundRestaurant.map(function(item){
            const data = createHash('md5').update(item, 'ascii');
            return <span key={data.digest('hex')}>{item}<br/></span>;
        });
        return <pre>{ itemsList }</pre>
    }
}
