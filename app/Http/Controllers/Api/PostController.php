<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use App\Http\Resources\PostResource;
use App\Models\Post;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Resources\Json\JsonResource;

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

    public function store(StorePostRequest $request)
    {
        if ($request->hasFile('thumbnail')) {
            $file = $request->file('thumbnail');

            $fileinfo = [
                'name' => $file->getClientOriginalName(),
                'extension' => $file->getClientOriginalExtension(),
                'mimetype' => $file->getClientMimeType(),
                'size' => $file->getSize(),
            ];

            info($fileinfo);
        }

        $post = Post::create($request->validated());

        return PostResource::make($post);
    }

    public function show(Post $post): JsonResource
    {
        return PostResource::make($post);
    }

    public function update(Post $post, StorePostRequest $request)
    {
        $post->update($request->validated());

        return PostResource::make($post);
    }
}
