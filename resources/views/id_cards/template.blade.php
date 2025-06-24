@foreach($idCards as $card)
    <div>
        <h3>{{ $card['staff']->name }}</h3>
        <p>ID: {{ $card['staff']->staff_id }}</p>
        <img src="{{ $card['qr_code_data_uri'] }}" alt="QR Code">
        {{-- Other staff details --}}
    </div>
@endforeach
