### Hexlet tests and linter status:
[![Actions Status](https://github.com/SebastianAguilar12/fullstack-javascript-project-103/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/SebastianAguilar12/fullstack-javascript-project-103/actions) 
[![Maintainability](https://api.codeclimate.com/v1/badges/493c10cdcb8f964ff637/maintainability)](https://codeclimate.com/github/SebastianAguilar12/fullstack-javascript-project-103/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/493c10cdcb8f964ff637/test_coverage)](https://codeclimate.com/github/SebastianAguilar12/fullstack-javascript-project-103/test_coverage)

<h1>GENDIFF</h1>
<p>El juego consiste en una aplicación de consola, en la que el usuario debe ingresar el comando <i>gendiff -h</i> o <i>gendiff --help</i> para ver el funcionamiento y la descripción del juego.\nEn esta aplicación, se calculará la diferencia entre dos archivos, estos pueden ser de extensión <strong>.json</strong> o <strong>.yml</strong>; se mostrará en pantalla las propiedades de estos archivos que fueron modificadas, agregadas o eliminadas según corresponda.\nLo que hace interesante esta aplicación es que se puede escoger entre tres tipos de formato:</p>

<ol>
  <li><b>Tipo objeto JavaScript con espacios suficientes en la indentación para facilitar la lectura<i>(Stylish)</i></b></li>
  <li><b>Tipo archivo plano que describe literalmente la modificación que tuvo cada propiedad<i>(Plain)</i></b></li>
  <li><b>Tipo JSON<i>(json)</i></b></li>
</ol>

<p>El comando para ejecutar el resultado es <strong>gendiff --format <i>format name</i> &lt;filepath1&gt; &lt;filepath2&gt; </strong> </p>

<h2>Tipo Stylish:</h2>
<p>El formato tipo <i>stylish</i> genera un resultado en formato tipo objeto de JavaScript con una diferencia, las propiedades no tienen comillas ni en el nombre de la llave, ni en el valor. Este formato consiste en mostrar las propiedades que aparezcan en el primer archivo, pero no en el segundo, con un "-" al comienzo del nombre de cada llave, dando a entender que estas se han eliminado; si las propiedades aparecen en el segundo archivo pero no en el primero, se mostrará con un "+" al comienzo del nombre de la llave, dando a entender que estas se han agregado. Si la propiedad aparece en los dos archivos, sin que se haya modificado su valor, se mostrará tal cual. Por último, si la propiedad aparece en los dos archivos pero su valor se ha modificado, se mostrará primero con un "-" al principio del nombre de la llave, con el valor original (el valor que tiene la llave en el archivo 1), y luego se mostrará la misma llave pero con un "+" al comienzo del nombre, con el valor modificado (el valor que tiene en el archivo 2). Por ejemplo, imaginemos la siguiente propiedad indentada:</p>

<pre><code>
//File1: Objeto JSON
"common": {
    "setting1": "Value 1",
    "setting2": 200,
    "setting3": true,
    "setting6": {
      "key": "value",
      "doge": {
        "wow": ""
      }
    }
  }
</code></pre>

<pre><code>
//File2: Objeto JSON
"common": {
    "follow": false,
    "setting1": "Value 1",
    "setting3": null,
    "setting4": "blah blah",
    "setting5": {
      "key5": "value5"
    },
    "setting6": {
      "key": "value",
      "ops": "vops",
      "doge": {
        "wow": "so much"
      }
    }
  }
</code></pre>

<pre><code>
//El resultado de gendiff se vería así:
common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
</code></pre>

<h2>Tipo Plain:</h2>
<p>El formato tipo Plain, muestra en pantalla una forma más legible y entendible para el ser humano, la modificación que ha tenido cada propiedad. En el ejemplo anterior, vemos que, por ejemplo, la llave <i>wow</i> fue modificada, en el archivo 1, su valor era una cadena vacía y en el archivo 2, su valor es <i>so much</i>. Esta llave tiene algo en particular, para llegar a ella, se pasa por alguna indentaciones, es decir, su padre sería la llave <i>doge</i>, que a su vez, el padre es <i>setting 6</i> y, a su vez, el padre es <i>common</i>; una forma más fácil para referirse a la llave <i>wow</i> es la siguiente ruta <code>'common.setting6.doge.wow'</code>. Así es como utiliza las rutas el formato <i>Plain</i> para explicar si una propiedad ha sido modificada, eliminada o agregada. el texto, para esta llave en específico quedaría así:</p>

<code>Property 'common.setting6.doge.wow' was updated. From '' to 'so much'</code>

<p>Para todo el objeto del ejemplo, quedaría así:</p>

<pre><code>
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
</code></pre>

<p>Cabe aclarar que, en este formato, cuando se habla de una llave que tiene como valor un objeto, se reemplaza por <code>'[complex value]'</code> como se puede ver en el ejemplo.</p>

<h2>JSON</h2>
<p>Este formato presenta los cambios en cada una de las propiedades de los objetos analizados, tal cual como se vería un objeto en formato JSON, solo que describiendo el tipo de llave (es decir, si es la clave raíz o está anidada), el nombre de la llave y los hijos. Al escoger este formato, el usuario decide ver los cambios, teniendo en cuenta el ejemplo anterior, de la siguiente forma:</p>

<pre><code>
{"type":"root","children":[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"deleted","value":200},{"key":"setting3","type":"changed","value1":true,"value2":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"changed","value1":"","value2":"so much"}]}]}]}]}
</code></pre>

<h3>Conclusión</h3>

<p>Esta aplicación de consola, muestra al usuario la diferencia entre dos archivos, bien sea de extensión <i>.json</i> o <i>.yml</i>, teniendo en cuenta la indentación de sus propiedades y el valor de cada una. Para mostrar estas diferencias, el usuario puede escoger entre tres tipos de formato diferentes, que son: <i>stylish</i>, <i>plain</i> o <i>json.</i> Cada formato tiene sus características para hacer que la lectura de las diferencias sea más fácil para el usuario.</p>

Link ejemplo primer funcionamiento: https://asciinema.org/a/uxVNkvqyp98omLdJAcOF4yWG5 
Link asciinema funcionamiento de gendiff con archivos .yml: https://asciinema.org/a/a7vK0EpboHsw6acKtVwwouRBF
Link ejemplo de fincionamiento con archivos indentados https://asciinema.org/a/6KYWTfHGaZBZXMZ4kLJOnpy1h
Link funcionamiento indent Files: https://asciinema.org/a/I9UUhV5dHl9ESYyYR6MYO3r1p
Link funcionamiento formato plain: https://asciinema.org/a/XIDu2capd1P6DWgXeyEMrrfP8
Link json format working: https://asciinema.org/a/SfEHkSfT1dXH71Vwtggho23my
