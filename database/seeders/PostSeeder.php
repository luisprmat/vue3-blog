<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $category1 = Category::create(['name' => 'Teoremas']);
        $category2 = Category::create(['name' => 'Estadística']);

        Post::create([
            'title' => 'Los axiomas de Peano',
            'content' => <<<'CONTENT'
                Son **postulados** que nos dan la base para construir toda la teoría de los números naturales.

                Fueron formulados por el matemático [Giuseppe Peano](https://es.wikipedia.org/wiki/Giuseppe_Peano), y se resumen en los siguientes _cinco_:
                - El `0` es un _número natural_.
                - Todo número natural *n* tiene un sucesor.
                - El `0` no es el sucesor de ningún número natural.
                - Si hay dos números naturales *n* y *m* con el mismo _sucesor_, entonces *n* y *m* son el mismo número natural.
                - Si el `0` pertenece a un conjunto cualquiera, y dado un número natural cualquiera, el sucesor también pertenece al conjunto, entonces todos los números naturales pertenecen a ese conjunto.

                Este último _axioma_ es el principio de *inducción matemática*.
                CONTENT,
            'category_id' => $category1->id,
        ]);

        Post::create([
            'title' => 'El último teorema de Fermat',
            'content' => <<<'CONTENT'
                El último teorema de Fermat, o teorema de *Fermat-Wiles*, es uno de los teoremas más famosos en la historia de las matemáticas.

                Demoró más de trescientos años en ser demostrado, dando origen a diversas teorías matemáticas.
                CONTENT,
            'category_id' => $category1->id,
        ]);

        Post::create([
            'title' => 'Teorema de pitágoras',
            'content' => <<<'CONTENT'
                En todo triángulo rectángulo se cumple que si $a$ y $b$ son los catetos y $h$ la hipotenusa, entonces

                $$h=\sqrt{a^2+b^2}$$

                Esta afirmación es de doble sentido, es decir si se cumple la expresión anterior entonces el triángulo necesariamente es rectángulo.
                CONTENT,
            'category_id' => $category1->id,
        ]);

        Post::create([
            'title' => '¿Cómo agrupar en tablas de frecuencias?',
            'content' => <<<'CONTENT'
                Si tengo varios datos dispersos, podemos agruparlos en tablas de frecuencias.

                ---

                ### Ejemplo

                Los 10 datos
                ```
                2, 2, 4, 3, 5, 7, 8, 2, 3, 2
                ```
                los podemos organizar como
                | i    | x_i  | f_i  | F_i  |
                | :--: | :--: | :--: | :--: |
                | 1    | 2    | 4    | 4    |
                | 2    | 3    | 2    | 6    |
                | 3    | 4    | 1    | 7    |
                | 4    | 5    | 1    | 8    |
                | 5    | 7    | 1    | 9    |
                | 6    | 8    | 1    | 10   |
                CONTENT,
            'category_id' => $category2->id,
        ]);

        Post::create([
            'title' => '¿Cómo calcular la media aritmética en una tabla de frecuencias?',
            'content' => <<<'CONTENT'
                Si tengo una tabla como:

                | i    | x_i  | f_i    | x_i*f_i | F_i  |
                | :--: | :--: | :----: | :-----: |:--:  |
                | 1    | 2    | 4      | 8       | 4    |
                | 2    | 3    | 2      | 6       | 6    |
                | 3    | 4    | 1      | 4       | 7    |
                | 4    | 5    | 1      | 5       | 8    |
                | 5    | 7    | 1      | 7       | 9    |
                | 6    | 8    | 1      | 8       | 10   |
                |      |      | **10** | **38**  |      |

                entonces la **media aritmética** $\overline x$ se calcula como

                $$\overline x = \frac{\sum_{i=1}^nf_i\cdot x_i}{\sum_{i=1}^nf_i}$$

                es decir en este caso

                $$\overline x = \frac{38}{10} = 3.8$$
                CONTENT,
            'category_id' => $category2->id,
        ]);
    }
}
