// Add this to your discover page script
const users = [
    {
        id: 1,
        name: 'Sarah',
        age: 24,
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        photos: [
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        location: '2 km away',
        online: true,
        verified: true,
        bio: 'Adventure seeker, coffee lover, and dog mom. Let\'s explore the city together! I love hiking and trying new restaurants.',
        interests: ['Travel', 'Coffee', 'Hiking', 'Photography']
    },
    {
        id: 2,
        name: 'Emma',
        age: 26,
        photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        photos: [
            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
            'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ],
        location: '5 km away',
        online: false,
        verified: false,
        bio: 'Art enthusiast, yoga instructor, and foodie. Looking for meaningful conversations and creative connections.',
        interests: ['Art', 'Yoga', 'Food', 'Music']
    }
];

let currentUsers = [...users];
let swipedUsers = [];
let currentPhotoIndex = {};

function showToast(message, isSuccess = false) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    if (isSuccess) toast.classList.add('success');
    
    setTimeout(() => {
        toast.classList.remove('show', 'success');
    }, 2000);
}

function handleAction(action, userId) {
    const user = currentUsers.find(u => u.id == userId) || currentUsers[0];
    if (!user) return;
    
    let message = '';
    switch(action) {
        case 'like':
            message = `You liked ${user.name}!`;
            if (Math.random() > 0.5) {
                setTimeout(() => showToast(`It's a match with ${user.name}! 🎉`, true), 500);
            }
            break;
        case 'dislike':
            message = `You passed on ${user.name}`;
            break;
        case 'superlike':
            message = `Super liked ${user.name}! ✨`;
            break;
        case 'gift':
            message = `Send a gift to ${user.name} 🎁`;
            break;
        case 'message':
            message = `Start chatting with ${user.name} 💬`;
            break;
        case 'more':
            message = `More options for ${user.name}`;
            break;
    }
    
    showToast(message);
    
    // Remove card if it's like/dislike
    if (['like', 'dislike', 'superlike'].includes(action)) {
        const card = document.getElementById(`card-${user.id}`);
        if (card) {
            card.classList.add(action === 'dislike' ? 'swipe-left' : 'swipe-right');
            setTimeout(() => {
                const index = currentUsers.findIndex(u => u.id == user.id);
                if (index !== -1) {
                    currentUsers.splice(index, 1);
                    swipedUsers.push(user);
                    // Here you would reload cards or show next
                }
            }, 300);
        }
    }
}

function changePhoto(userId, direction) {
    const user = currentUsers.find(u => u.id == userId);
    if (!user || !user.photos) return;
    
    currentPhotoIndex[userId] = (currentPhotoIndex[userId] || 0) + direction;
    if (currentPhotoIndex[userId] < 0) currentPhotoIndex[userId] = user.photos.length - 1;
    if (currentPhotoIndex[userId] >= user.photos.length) currentPhotoIndex[userId] = 0;
    
    const img = document.querySelector(`#card-${userId} img`);
    if (img) img.src = user.photos[currentPhotoIndex[userId]];
}

// Event listeners
document.getElementById('likeBtn')?.addEventListener('click', () => {
    if (currentUsers.length > 0) handleAction('like', currentUsers[0].id);
});

document.getElementById('dislikeBtn')?.addEventListener('click', () => {
    if (currentUsers.length > 0) handleAction('dislike', currentUsers[0].id);
});

document.getElementById('superlikeBtn')?.addEventListener('click', () => {
    if (currentUsers.length > 0) handleAction('superlike', currentUsers[0].id);
});

document.getElementById('giftBtn')?.addEventListener('click', () => {
    if (currentUsers.length > 0) handleAction('gift', currentUsers[0].id);
});

document.getElementById('messageBtn')?.addEventListener('click', () => {
    if (currentUsers.length > 0) handleAction('message', currentUsers[0].id);
});

document.getElementById('moreBtn')?.addEventListener('click', () => {
    if (currentUsers.length > 0) handleAction('more', currentUsers[0].id);
});