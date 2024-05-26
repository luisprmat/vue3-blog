<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class PostController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        $posts = Post::with('category')
            ->when(request('category'), function (Builder $query) {
                $query->where('category_id', request('category'));
            })
            ->when(request('sort'), function (Builder $query) {
                $sortField = request('sort', 'created_at');

                $orderDirection = str($sortField)->startsWith('-') ? 'desc' : 'asc';
                $orderColumn = ltrim($sortField, '-');
                if (! in_array($orderColumn, ['id', 'title', 'created_at'])) {
                    $orderColumn = 'created_at';
                }

                $query->orderBy($orderColumn, $orderDirection);
            }, function (Builder $query) {
                $query->latest();
            })
            ->paginate(10);

        return PostResource::collection($posts);
    }
}
