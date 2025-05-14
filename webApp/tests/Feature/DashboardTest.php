<?php

namespace Tests\Feature;

use App\Models\User;
use App\Models\Post;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use PHPUnit\Framework\Attributes\Test;

class DashboardTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function guest_is_redirected_to_login()
    {
        $response = $this->get('/dashboard');
        $response->assertRedirect('/login');
    }

    #[Test]
    public function user_can_see_only_their_own_posts_on_dashboard()
    {
        $user = User::factory()->create();
        $other = User::factory()->create();
        $myPost = Post::factory()->create(['user_id' => $user->id, 'content' => 'my post']);
        $otherPost = Post::factory()->create(['user_id' => $other->id, 'content' => 'other post']);

        $response = $this->actingAs($user)->get('/dashboard');
        $response->assertStatus(200);
        $response->assertSee('my post');
        $response->assertDontSee('other post');
    }

    #[Test]
    public function user_can_post_from_dashboard()
    {
        $user = User::factory()->create();
        $this->actingAs($user)
            ->post('/posts', ['content' => 'new post'])
            ->assertRedirect('/dashboard');
        $this->assertDatabaseHas('posts', [
            'user_id' => $user->id,
            'content' => 'new post',
        ]);
    }
}
